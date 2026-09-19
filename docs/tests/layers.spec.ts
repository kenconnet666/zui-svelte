import { expect, test } from '@playwright/test';

test('coordinates three levels, focus, outside interactions and resource cleanup', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/#/__layer-test');
  await page.getByRole('button', { name: '打开主层', exact: true }).click();
  const parent = page.getByTestId('主弹窗');
  await expect(page.getByLabel('主弹窗输入', { exact: true })).toBeFocused();
  await expect(page.locator('html')).toHaveAttribute('data-zui-scroll-lock', /zui-layer/u);
  await expect
    .poll(() => page.locator('.site').evaluate((node) => Boolean(node.closest('[inert]'))))
    .toBe(true);
  await parent.getByRole('button', { name: '打开子弹窗', exact: true }).click();
  const child = page.getByTestId('子弹窗');
  await child.getByRole('button', { name: '打开子列表', exact: true }).click();
  const popup = page.getByTestId('子列表');
  await expect(popup).toBeVisible();
  await expect
    .poll(async () => Number(await popup.evaluate((node) => getComputedStyle(node).zIndex)))
    .toBeGreaterThan(Number(await child.evaluate((node) => getComputedStyle(node).zIndex)));
  await page.keyboard.press('Escape');
  await expect(popup).toHaveCount(0);
  await expect(child).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(child).toHaveCount(0);
  await expect(parent.getByRole('button', { name: '打开子弹窗', exact: true })).toBeFocused();
  await page.mouse.click(10, 10);
  await expect(parent).toHaveCount(0);
  await expect(page.getByRole('button', { name: '打开主层', exact: true })).toBeFocused();
  await expect(page.locator('html')).not.toHaveAttribute('data-zui-scroll-lock');
  await expect
    .poll(() => page.locator('.site').evaluate((node) => Boolean(node.closest('[inert]'))))
    .toBe(false);
  await expect(page.getByTestId('layer-stats')).toContainText('"layers":0');
  await expect(page.getByTestId('layer-stats')).toContainText('"sheets":0');
  expect(errors).toEqual([]);
});

test('honors cancellation, holds resources during exit and survives detached triggers', async ({
  page,
}) => {
  await page.goto('/#/__layer-test');
  await page.getByLabel('阻止关闭').check();
  await page.getByRole('button', { name: '打开主层', exact: true }).click();
  const panel = page.getByTestId('主弹窗');
  await page.keyboard.press('Escape');
  await expect(panel).toBeVisible();
  await panel.getByRole('button', { name: '完成退出', exact: true }).click();
  await page.getByLabel('阻止关闭').uncheck();
  await page.getByLabel('保留退出').check();
  await page.getByRole('button', { name: '打开主层', exact: true }).click();
  await panel.getByRole('button', { name: '移除触发器', exact: true }).click();
  await page.keyboard.press('Escape');
  await expect(panel).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('data-zui-scroll-lock', /zui-layer/u);
  // closing 阶段禁用指针，直接移除 DOM 模拟拥有者结束退出/异常卸载。
  await panel.evaluate((node) => node.parentElement!.remove());
  await expect(page.locator('html')).not.toHaveAttribute('data-zui-scroll-lock');
  await expect(page.getByTestId('layer-stats')).toContainText('"layers":0');
});

test('supports a ShadowRoot and repeated mount cycles without accumulating locks', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/#/__layer-test');
  await page.getByRole('button', { name: '打开影子层', exact: true }).click();
  await expect(page.getByLabel('影子弹窗输入', { exact: true })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.getByTestId('影子弹窗')).toHaveCount(0);
  await page.getByRole('button', { name: '循环一百次', exact: true }).click();
  await expect(page.getByTestId('layer-stats')).toContainText('"layers":0');
  await expect(page.getByTestId('layer-stats')).toContainText('"traps":0');
  await expect(page.getByTestId('layer-stats')).toContainText('"listening":false');
  expect(await page.locator('style[data-zui^="zui-layer-"]').count()).toBe(0);
  expect(errors).toEqual([]);
});
