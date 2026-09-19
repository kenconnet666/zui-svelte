import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('consumes Decimal, Zod and calendar values through the public package', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/#/values');
  await expect(page.getByTestId('decimal-value')).toHaveText('0.10');
  await page.getByRole('button', { name: '增加 0.20', exact: true }).click();
  await expect(page.getByTestId('decimal-value')).toHaveText('0.30');
  await page.getByLabel('金额', { exact: true }).fill('invalid');
  await expect(page.getByRole('alert')).toContainText('非负金额');
  await expect(page.getByRole('button', { name: '增加 0.20' })).toBeDisabled();
  await page.getByLabel('金额', { exact: true }).fill('12.30');
  await expect(page.getByTestId('decimal-value')).toHaveText('12.30');
  await page.getByRole('button', { name: '增加一天', exact: true }).click();
  await expect(page.getByTestId('calendar-date')).toHaveText('2026-09-20');
  expect(errors).toEqual([]);
});

test('production bundle never imports library source', async ({ request }) => {
  test.skip(!process.env.CI && process.env.ZUI_DOCS_PREVIEW !== '1', 'Build artifact assertion');
  const response = await request.get('/consumer-boundary.json');
  expect(response.ok()).toBe(true);
  expect(await response.json()).toEqual({
    libraries: ['@zui/core', '@zui/svelte'],
    sourceLeaks: [],
  });
});

for (const route of ['/', '/core', '/components', '/values']) {
  test('public docs accessibility: ' + route, async ({ page }, info) => {
    await page.goto('/#' + route);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    const result = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();
    await info.attach('accessibility.json', {
      body: JSON.stringify(result),
      contentType: 'application/json',
    });
    expect(result.violations).toEqual([]);
  });
}
