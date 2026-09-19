import { expect, test } from '@playwright/test';

test('UI layers override by role rather than class order', async ({ page }) => {
  await page.goto('/#/__layers-test');
  await expect(page.getByTestId('ui-layer-default')).toHaveCSS('color', 'rgb(0, 0, 255)');
  await expect(page.getByTestId('ui-layer-app')).toHaveCSS('color', 'rgb(0, 128, 0)');
  await expect(page.getByTestId('ui-layer-native')).toHaveCSS('color', 'rgb(128, 0, 128)');
});

test('compiled defaults stay reactive and slots retain classes, attributes and events', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/#/__config-test');
  const control = page.getByTestId('config-control');
  await expect(control).toHaveAttribute('data-size', 'md');
  await expect(control).toHaveAttribute('data-block', 'false');
  await expect(control).toHaveCSS('width', '120px');
  await expect(control).toHaveClass(/outer inner instance/u);
  const content = control.locator('span');
  await expect(content).toHaveAttribute('title', 'inherited');
  await expect(content).toHaveClass(/outer-content instance-content control-content/u);
  await content.click();
  await expect(page.getByTestId('config-clicks')).toHaveText('1');
  await page.getByRole('button', { name: '切换默认尺寸' }).click();
  await expect(control).toHaveAttribute('data-size', 'lg');
  await expect(control).toHaveCSS('width', '180px');
  expect(errors).toEqual([]);
});
