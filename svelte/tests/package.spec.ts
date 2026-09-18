import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { expect, test } from '@playwright/test';

test.describe('prerender without client scripts', () => {
  test.use({ javaScriptEnabled: false });
  test('packed core styles remain usable in prerendered HTML without JavaScript', async ({
    page,
  }) => {
    const html = await readFile(
      join(process.env.ZUI_KIT_DIRECTORY!, 'prerender/static.html'),
      'utf8',
    );
    // 直接消费静态产物；不允许由客户端脚本补齐首屏样式。
    await page.setContent(html);
    await expect(page.getByTestId('prerender-target')).toHaveCSS('width', '213px');
    await expect(page.getByTestId('prerender-target')).toHaveCSS('color', 'rgb(255, 0, 0)');
    await expect(page.getByTestId('prerender-nested')).toHaveCSS('color', 'rgb(0, 0, 255)');
  });
});

test('forwards plain classes to an unmanaged dependency and cleans them during Kit navigation', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/forwarded');
  await expect(page.locator('html')).toHaveAttribute('data-zui-ready', 'z');
  const target = page.getByTestId('plain-target');
  await expect(target).toHaveCSS('width', '100px');
  for (const width of [120, 140]) {
    await page.getByRole('button', { name: 'Resize forwarded' }).click();
    await expect(target).toHaveCSS('width', width + 'px');
    expect(await target.getAttribute('style')).toBeNull();
  }
  const oldClass = await target.getAttribute('class');
  await page.getByRole('link', { name: 'Static route' }).click();
  await expect(page.getByTestId('prerender-target')).toHaveCSS('width', '213px');
  await expect(page.getByTestId('prerender-target')).toHaveCSS('color', 'rgb(255, 0, 0)');
  await page.getByRole('button', { name: 'Change package theme' }).click();
  await expect(page.getByTestId('prerender-target')).toHaveCSS('color', 'rgb(0, 128, 0)');
  await expect(page.getByTestId('prerender-nested')).toHaveCSS('color', 'rgb(0, 0, 255)');
  expect(await page.locator('article').getAttribute('style')).toBeNull();
  await expect
    .poll(() =>
      page
        .locator('style[data-zui]')
        .allTextContents()
        .then((rules) => rules.join('')),
    )
    .not.toContain('.' + oldClass);
  await page.goBack();
  await expect(target).toHaveCSS('width', '100px');
  expect(errors).toEqual([]);
});
