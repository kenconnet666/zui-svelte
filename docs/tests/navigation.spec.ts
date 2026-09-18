import { expect, test } from '@playwright/test';

test('navigates docs and renders the CSS example', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('从样式开始');
  await page.getByRole('navigation').getByRole('link', { name: '样式系统' }).click();
  await expect(page).toHaveURL(/#\/core$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('样式系统');
  await expect(page.getByLabel('CSS 示例')).toContainText('s.width.px(width)');
  await page.reload();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('样式系统');
  await page.getByRole('navigation').getByRole('link', { name: '组件', exact: true }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Svelte 组件');
  expect(errors).toEqual([]);
});

test('shows unknown routes and fits a narrow screen', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/#/missing');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('页面不存在');
  await page.getByRole('link', { name: '返回概览' }).click();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('从样式开始');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
