import { expect, test } from '@playwright/test';

test('one thousand controls share configuration and release every style binding', async ({
  page,
  browser,
}, testInfo) => {
  await page.goto('/#/__config-test');
  await page.getByRole('button', { name: '挂载一千个控件' }).click();
  const controls = page.getByTestId('config-control');
  await expect(controls).toHaveCount(1000);
  const mounted = JSON.parse((await page.getByTestId('config-metrics').textContent())!);
  await page.getByRole('button', { name: '切换默认尺寸' }).click();
  await expect(controls.first()).toHaveCSS('width', '180px');
  await expect(controls.last()).toHaveCSS('width', '180px');
  await page.getByRole('button', { name: '卸载全部控件' }).click();
  await expect(controls).toHaveCount(0);
  const released = JSON.parse((await page.getByTestId('config-metrics').textContent())!);
  expect(released.bindings).toBe(0);
  // UI 层声明归 runtime 所有，卸载控件应回到构造后的基线，不删除仍在使用的层顺序。
  expect(released.sources).toBe(released.baseline.sources);
  expect(released.rules).toBe(released.baseline.rules);
  await testInfo.attach('configuration-scale.json', {
    contentType: 'application/json',
    body: JSON.stringify({ browser: browser.version(), mounted, released }, null, 2),
  });
});

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
