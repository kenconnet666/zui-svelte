import { expect, test } from '@playwright/test';

test('overlay scrollbars do not resize content and keep native dragging and keyboard scrolling', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/#/layout');
  const root = page.getByTestId('scroll-root'),
    viewport = page.getByTestId('scroll-viewport');
  const size = () => viewport.evaluate((node) => [node.clientWidth, node.clientHeight]);
  const initial = await size();
  await expect(root.locator('[data-scrollbar]')).toHaveCount(0);
  await page.getByRole('button', { name: '切换长内容' }).click();
  await expect(root.locator('[data-scrollbar="y"]')).toHaveCount(1);
  expect(await size()).toEqual(initial);
  await root.hover();
  await expect(root.locator('[data-scrollbar="y"]')).toHaveCSS('opacity', '1');
  const thumb = (await root.locator('[data-scrollbar="y"] [data-scroll-thumb]').boundingBox())!;
  await page.mouse.move(thumb.x + thumb.width / 2, thumb.y + 5);
  await page.mouse.down();
  await page.mouse.move(thumb.x + thumb.width / 2, thumb.y + 85);
  await page.mouse.up();
  await expect.poll(() => viewport.evaluate((node) => node.scrollTop)).toBeGreaterThan(100);
  await page.getByRole('button', { name: '切换横向溢出' }).click();
  await expect(root.locator('[data-scrollbar="x"]')).toHaveCount(1);
  expect(await size()).toEqual(initial);
  await viewport.focus();
  await page.keyboard.press('Home');
  await page.keyboard.press('ArrowDown');
  await expect.poll(() => viewport.evaluate((node) => node.scrollTop)).toBeGreaterThan(0);
  await page.getByRole('button', { name: '切换长内容' }).click();
  await expect(root.locator('[data-scrollbar="y"]')).toHaveCount(0);
  expect(await size()).toEqual(initial);
  expect(errors).toEqual([]);
});

test('published layout components inherit config and preserve instance CSS', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/#/layout');
  await expect(page.getByTestId('layout-stack')).toHaveCSS('gap', '12px');
  await expect(page.getByTestId('layout-grid')).toHaveCSS('display', 'grid');
  await page.getByRole('button', { name: '切换布局间距' }).click();
  await expect(page.getByTestId('layout-stack')).toHaveCSS('gap', '24px');
  await expect(page.getByTestId('layout-explicit')).toHaveCSS('gap', '8px');
  await page.getByRole('button', { name: '切换列数' }).click();
  await expect
    .poll(() =>
      page
        .getByTestId('layout-grid')
        .evaluate((node) => getComputedStyle(node).gridTemplateColumns.split(' ').length),
    )
    .toBe(2);
  await expect
    .poll(() =>
      page
        .getByTestId('layout-override')
        .evaluate((node) => getComputedStyle(node).gridTemplateColumns.split(' ').length),
    )
    .toBe(1);
  await page.setViewportSize({ width: 390, height: 720 });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= document.documentElement.clientWidth,
    ),
  ).toBe(true);
  expect(errors).toEqual([]);
});
