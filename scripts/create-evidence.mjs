import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';

// 只在所有验收步骤成功之后生成；此清单关联证据，不替代各步骤的断言。
const commit = process.env.GITHUB_SHA;
assert(commit, 'Candidate evidence requires a CI commit.');
const root = new URL('../', import.meta.url);
const paths = [
  'core/test-results/contracts.json',
  'core/test-results/css-coverage.json',
  'core/test-results/type-budget.json',
  'core/test-results/benchmark.json',
  'core/test-results/browser-benchmark.json',
  'svelte/test-results/packages/verification.json',
  'svelte/test-results/distribution.json',
];
const reports = [];
for (const path of paths) {
  const bytes = await readFile(new URL(path, root));
  const data = JSON.parse(bytes);
  assert.equal(data.commit, commit, 'Mismatched report: ' + path);
  reports.push({ path, sha256: createHash('sha256').update(bytes).digest('hex'), data });
}
const browser = reports.find(({ path }) => path.endsWith('/browser-benchmark.json')).data;
assert.equal(browser.results.length, 6);
for (const engine of ['chromium', 'firefox', 'webkit'])
  for (const variables of ['inline', 'stylesheet'])
    assert(browser.results.some((item) => item.engine === engine && item.variables === variables));
const packages = reports.find(({ path }) => path.endsWith('/verification.json')).data;
assert.equal(packages.success, true);
assert.equal(packages.archives.length, 2);
for (const archive of packages.archives) {
  assert(/^zui-(core|svelte)-[^/\\]+\.tgz$/u.test(archive.name));
  const bytes = await readFile(new URL('svelte/test-results/packages/' + archive.name, root));
  assert.equal(createHash('sha256').update(bytes).digest('hex'), archive.sha256);
}
await writeFile(
  new URL('svelte/test-results/candidate-evidence.json', root),
  JSON.stringify(
    { commit, run: process.env.GITHUB_RUN_ID, reports, archives: packages.archives },
    null,
    2,
  ) + '\n',
);
