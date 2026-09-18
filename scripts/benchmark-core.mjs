import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { cpus, platform } from 'node:os';
import { performance } from 'node:perf_hooks';
import { createRuntime } from '../core/dist/index.js';

const results = [];
function measure(name, run) {
  run();
  const samples = [];
  for (let i = 0; i < 5; i++) {
    globalThis.gc?.();
    const start = performance.now();
    run();
    samples.push(performance.now() - start);
  }
  samples.sort((a, b) => a - b);
  results.push({ name, samplesMs: samples, p50Ms: samples[2], p95Ms: samples[4] });
}

function assertReleased(runtime) {
  runtime.dispose();
  const stats = runtime.stats;
  for (const key of ['bindings', 'rules', 'sources', 'styleEntries'])
    assert.equal(stats[key], 0, key);
}

measure('10000-stable-updates', () => {
  const runtime = createRuntime();
  const binding = runtime.binding();
  for (const width of [100, 120])
    binding.evaluate((s) => {
      s.width.px(width);
    });
  const before = runtime.stats;
  for (let i = 0; i < 10000; i++)
    binding.evaluate((s) => {
      s.width.px(200 + i);
    });
  assert.equal(runtime.stats.ruleCompilations, before.ruleCompilations);
  assert.equal(runtime.stats.rules, 1);
  assertReleased(runtime);
});

measure('1000-instances-100-updates', () => {
  const runtime = createRuntime({ variables: 'stylesheet' });
  const bindings = Array.from({ length: 1000 }, () => runtime.binding({ source: 'shared' }));
  for (const binding of bindings)
    binding.evaluate((s) => {
      s.width.px(100);
    });
  assert.equal(runtime.stats.rules, 1);
  bindings.forEach((binding, index) =>
    binding.evaluate((s) => {
      s.width.px(120 + index);
    }),
  );
  const before = runtime.stats;
  for (let round = 0; round < 100; round++)
    bindings.forEach((binding, index) =>
      binding.evaluate((s) => {
        s.width.px(200 + round + index);
      }),
    );
  assert.equal(runtime.stats.ruleCompilations, before.ruleCompilations);
  assert.equal(runtime.stats.rules, 1000);
  assert.equal(runtime.stats.styleEntries, 2000);
  bindings.forEach((binding, index) =>
    assert.equal(Object.values(binding.snapshot.variables)[0], 299 + index + 'px'),
  );
  assertReleased(runtime);
});

measure('100-mount-dispose-cycles', () => {
  const runtime = createRuntime();
  for (let cycle = 0; cycle < 100; cycle++) {
    const binding = runtime.binding();
    binding.evaluate((s) => {
      s.width.px(cycle);
    });
    binding.dispose();
    assert.equal(runtime.stats.sources, 0);
    assert.equal(runtime.stats.rules, 0);
  }
  assertReleased(runtime);
});

const report = { node: process.version, platform: platform(), cpu: cpus()[0]?.model, results };
const directory = new URL('../core/test-results/', import.meta.url);
await mkdir(directory, { recursive: true });
await writeFile(new URL('benchmark.json', directory), JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report));
