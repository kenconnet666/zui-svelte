import { expect, test } from '@playwright/test';

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
