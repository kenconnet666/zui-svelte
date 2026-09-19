import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
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

const report = {
  commit: process.env.GITHUB_SHA ?? null,
  node: process.version,
  platform: platform(),
  cpu: cpus()[0]?.model,
  results,
};
// 强制 GC 后记录多批次保留堆，补充显式引用计数无法观察到的全局缓存泄漏。
assert(globalThis.gc, 'Run this benchmark with --expose-gc.');
const heapSamples = [];
for (let batch = 0; batch < 6; batch++) {
  for (let cycle = 0; cycle < 200; cycle++) {
    const runtime = createRuntime();
    const binding = runtime.binding({ source: 'heap-' + batch + '-' + cycle });
    binding.evaluate((s) => {
      s.width.px(cycle + 1);
    });
    binding.evaluate((s) => {
      s.width.px(cycle + 2);
    });
    assertReleased(runtime);
  }
  globalThis.gc();
  heapSamples.push(process.memoryUsage().heapUsed);
}
report.heap = {
  samplesBytes: heapSamples,
  retainedGrowthBytes: Math.max(0, ...heapSamples.slice(1).map((value) => value - heapSamples[0])),
};
const budget = JSON.parse(
  await readFile(new URL('../.design/core-performance-budget.json', import.meta.url), 'utf8'),
);
assert(
  report.heap.retainedGrowthBytes <= budget.retainedHeapMaxBytes,
  'Retained heap growth budget exceeded.',
);
const comparable =
  report.platform === budget.reference.platform &&
  report.cpu === budget.reference.cpu &&
  report.node.split('.')[0] === budget.reference.node.split('.')[0];
report.timingBudget = comparable ? 'enforced' : 'different-environment';
const directory = new URL('../core/test-results/', import.meta.url);
await mkdir(directory, { recursive: true });
await writeFile(new URL('benchmark.json', directory), JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report));
if (comparable) {
  for (const result of results)
    assert.ok(
      result.p95Ms <= budget.p95LimitsMs[result.name],
      result.name + ' exceeded its p95 budget',
    );
}
