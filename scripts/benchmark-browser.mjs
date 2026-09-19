import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { cpus, platform } from 'node:os';

const root = fileURLToPath(new URL('../', import.meta.url));
const requireCore = createRequire(join(root, 'core/package.json'));
const playwright = requireCore('playwright');
const code = await readFile(join(root, 'core/test-results/core-browser.mjs'), 'utf8');
const moduleUrl = 'data:text/javascript;base64,' + Buffer.from(code).toString('base64');
// 预设数据来自 UI 包；被测 core 浏览器 bundle 不依赖或内置这些视觉值。
const { lightTheme: lightPreset, darkTheme: darkPreset } = await import('../svelte/dist/theme.js');
const themes = { light: lightPreset.definition, dark: darkPreset.definition };
const budget = JSON.parse(
  await readFile(join(root, '.design/core-distribution-budget.json'), 'utf8'),
);
const results = [];
for (const engine of process.env.CI ? ['chromium', 'firefox', 'webkit'] : ['chromium']) {
  const browser = await playwright[engine].launch({
    headless: true,
    ...(process.env.ZUI_BROWSER_CHANNEL ? { channel: process.env.ZUI_BROWSER_CHANNEL } : {}),
  });
  try {
    for (const variables of ['inline', 'stylesheet']) {
      const page = await browser.newPage();
      await page.setContent('<main></main>');
      const result = await page.evaluate(
        async ({ moduleUrl, variables, themes }) => {
          const { createRuntime, bindElement, bindTheme, ThemeScope, defineTheme } = await import(
            moduleUrl
          );
          const runtime = createRuntime({
            target: document,
            namespace: 'scale-budget',
            variables,
          });
          const host = document.querySelector('main');
          const bindings = [];
          try {
            for (let i = 0; i < 1000; i++) {
              const node = document.createElement('div');
              node.textContent = String(i);
              host.append(node);
              const binding = runtime.binding({ id: 'item' + i, source: 'items' });
              binding.evaluate((s) => {
                s.width.px(100);
              });
              bindElement(node, binding);
              binding.evaluate((s) => {
                s.width.px(200 + i);
              });
              bindings.push(binding);
            }
            const compiled = runtime.stats.ruleCompilations;
            const samples = [];
            for (let round = 0; round < 6; round++) {
              const start = performance.now();
              for (let i = 0; i < bindings.length; i++)
                bindings[i].evaluate((s) => {
                  s.width.px(2000 + round * 1000 + i);
                });
              if (getComputedStyle(host.lastElementChild).width !== 2999 + round * 1000 + 'px')
                throw new Error('Instance value mismatch');
              if (round) samples.push(performance.now() - start);
            }
            samples.sort((a, b) => a - b);
            const result = {
              samplesMs: samples,
              p50Ms: samples[2],
              p95Ms: samples[4],
              styleNodes: document.querySelectorAll('style[data-zui="scale-budget"]').length,
              stats: runtime.stats,
              extraCompilations: runtime.stats.ruleCompilations - compiled,
            };
            runtime.dispose();
            host.replaceChildren();
            const released = runtime.stats;
            const lightTheme = defineTheme(themes.light, { colorScheme: 'light' });
            const darkTheme = defineTheme(themes.dark, { colorScheme: 'dark' });
            const themeRuntime = createRuntime({
              theme: lightTheme,
              target: document,
              namespace: 'theme-budget',
              variables,
            });
            const scope = new ThemeScope(lightTheme);
            const themeSamples = [];
            try {
              bindTheme(host, scope, themeRuntime);
              const className = themeRuntime.css((s) => {
                s.color._text;
              });
              for (let i = 0; i < 1000; i++) {
                const node = document.createElement('div');
                node.className = className;
                node.textContent = String(i);
                host.append(node);
              }
              for (let round = 0; round < 101; round++) {
                const dark = round % 2 === 0;
                const start = performance.now();
                scope.setTheme(dark ? darkTheme : lightTheme);
                if (
                  getComputedStyle(host.lastElementChild).color !==
                  (dark ? 'rgb(248, 250, 252)' : 'rgb(15, 23, 42)')
                )
                  throw new Error('Theme value mismatch');
                if (round) themeSamples.push(performance.now() - start);
              }
              if ([...host.children].some((node) => node.className !== className))
                throw new Error('Theme switching replaced a consuming class');
              if (themeRuntime.stats.rules > 2 || themeRuntime.stats.styleEntries > 3)
                throw new Error('Theme switching accumulated obsolete rules');
            } finally {
              scope.dispose();
              themeRuntime.dispose();
              host.replaceChildren();
            }
            themeSamples.sort((a, b) => a - b);
            for (let cycle = 0; cycle < 100; cycle++) {
              const owner = createRuntime({ target: document, namespace: 'cycle-budget' });
              const node = document.createElement('div');
              host.append(node);
              const binding = owner.binding();
              bindElement(node, binding);
              binding.evaluate((s) => {
                s.width.px(cycle + 1);
              });
              owner.dispose();
              node.remove();
              for (const name of ['bindings', 'rules', 'sources', 'styleEntries'])
                if (owner.stats[name] !== 0)
                  throw new Error('Cycle did not release ownership: ' + name);
            }
            return {
              ...result,
              released,
              theme: {
                samplesMs: themeSamples,
                p50Ms: themeSamples[49],
                p95Ms: themeSamples[94],
                released: themeRuntime.stats,
              },
              remainingNodes: document.querySelectorAll('style[data-zui]').length,
            };
          } finally {
            runtime.dispose();
            host.replaceChildren();
          }
        },
        { moduleUrl, variables, themes },
      );
      assert.equal(result.extraCompilations, 0);
      assert.equal(result.stats.rules, 1000);
      const entryCount = variables === 'stylesheet' ? 2000 : 1000;
      assert.equal(result.stats.styleEntries, entryCount);
      assert(result.styleNodes <= Math.ceil(entryCount / 32), 'Too many physical style chunks');
      for (const name of ['bindings', 'rules', 'sources', 'styleEntries'])
        assert.equal(result.released[name], 0, name);
      assert.equal(result.remainingNodes, 0);
      for (const name of ['bindings', 'rules', 'sources', 'styleEntries'])
        assert.equal(result.theme.released[name], 0, 'Theme ' + name);
      assert(
        result.theme.p95Ms <= budget.browserUpdateP95Ms,
        'Catastrophic theme update regression',
      );
      assert(result.p95Ms <= budget.browserUpdateP95Ms, 'Catastrophic DOM update regression');
      results.push({ engine, variables, version: browser.version(), ...result });
      console.log(JSON.stringify(results.at(-1)));
      await page.close();
    }
  } finally {
    await browser.close();
  }
}
await writeFile(
  join(root, 'core/test-results/browser-benchmark.json'),
  JSON.stringify(
    {
      commit: process.env.GITHUB_SHA ?? null,
      platform: platform(),
      cpu: cpus()[0]?.model,
      results,
    },
    null,
    2,
  ) + '\n',
);
