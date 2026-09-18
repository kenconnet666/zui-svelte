import { expect, test } from '@playwright/test';

test('derived snapshots release old rules while setup constants remain available', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/#/__lifecycle-test');
  const fixed = page.getByTestId('fixed');
  const changing = page.getByTestId('changing');
  await expect(changing).toHaveCSS('width', '100px');
  const initial = await page.locator('style[data-zui="z"]').count();
  await page.getByRole('button', { name: 'Update 100 times', exact: true }).click();
  await expect(page.getByTestId('completed')).toHaveText('1');
  await expect(changing).toHaveCSS('width', '200px');
  await expect(fixed).toHaveCSS('width', '100px');
  await expect
    .poll(() => page.locator('style[data-zui="z"]').count())
    .toBeLessThanOrEqual(initial + 1);
  await page.getByRole('button', { name: 'Toggle derived', exact: true }).click();
  await expect(changing).toHaveCount(0);
  await expect(fixed).toHaveCSS('width', '100px');
  await page.getByRole('button', { name: 'Toggle derived', exact: true }).click();
  await expect(changing).toHaveCSS('width', '200px');
  expect(errors).toEqual([]);
  await page.getByRole('navigation').getByRole('link', { name: '概览' }).click();
  await expect(page.locator('style[data-zui="z"]')).toHaveCount(0);
});

test('module style snapshots register in the browser and release on navigation', async ({
  page,
}) => {
  await page.goto('/#/__module-test');
  await expect(page.getByText('module snapshot', { exact: true })).toHaveCSS('width', '173px');
  await page.getByRole('navigation').getByRole('link', { name: '概览' }).click();
  await expect(page.locator('style[data-zui="z"]')).toHaveCount(0);
});

test('stylesheet variables update under a nonce policy that forbids style attributes', async ({
  page,
}) => {
  // 开发服务器会自行注入无 nonce 的 CSS；严格策略验证使用 CI 构建产物。
  test.skip(!process.env.CI, 'Strict CSP is verified against the production build.');
  await page.addInitScript(() => {
    const violations: string[] = [];
    Reflect.set(window, 'cspViolations', violations);
    document.addEventListener('securitypolicyviolation', (event) =>
      violations.push(event.violatedDirective),
    );
  });
  await page.route('**/*', async (route) => {
    if (route.request().resourceType() !== 'document') return route.continue();
    const response = await route.fetch();
    await route.fulfill({
      response,
      headers: {
        ...response.headers(),
        'content-security-policy': "style-src-elem 'self' 'nonce-zui-probe'; style-src-attr 'none'",
      },
    });
  });
  await page.goto('/#/__csp-test');
  const target = page.getByTestId('csp-target');
  await expect(target).toHaveCSS('width', '100px');
  await page.getByRole('button', { name: 'Resize CSP', exact: true }).click();
  await expect(target).toHaveCSS('width', '120px');
  const promoted = await target.getAttribute('class');
  await page.getByRole('button', { name: 'Resize CSP', exact: true }).click();
  await expect(target).toHaveCSS('width', '140px');
  await expect(target).toHaveAttribute('class', promoted!);
  expect(await target.getAttribute('style')).toBeNull();
  await page.getByRole('button', { name: 'Switch theme', exact: true }).click();
  await expect(page.getByTestId('csp-theme')).toHaveCSS('color', 'rgb(255, 0, 0)');
  expect(await page.getByTestId('csp-theme').getAttribute('style')).toBeNull();
  expect(await page.evaluate(() => Reflect.get(window, 'cspViolations'))).toEqual([]);
  await page.getByRole('navigation').getByRole('link', { name: '概览' }).click();
  await expect(page.locator('style[data-zui="z"]')).toHaveCount(0);
});

test('inline CSS and slotProps update without replacing stable promoted classes', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/#/__core-test');
  const direct = page.getByTestId('direct');
  await expect(direct).toHaveCSS('width', '100px');
  await page.getByRole('button', { name: 'Resize', exact: true }).click();
  await expect(direct).toHaveCSS('width', '120px');
  const promoted = await direct.getAttribute('class');
  await page.getByRole('button', { name: 'Resize', exact: true }).click();
  await expect(direct).toHaveCSS('width', '140px');
  await expect(direct).toHaveAttribute('class', promoted!);
  await expect(page.getByTestId('forwarded')).toHaveCSS('width', '140px');
  await expect(page.getByTestId('forwarded-input')).toHaveCSS('font-size', '16px');
  await expect(page.getByTestId('option-40')).toHaveCSS('width', '54px');
  await expect(page.getByTestId('snippet-1')).toHaveCSS('width', '141px');
  await expect(page.getByTestId('snippet-2')).toHaveCSS('width', '142px');
  await expect(direct).toHaveCSS('color', 'rgb(255, 0, 0)');
  expect(await direct.getAttribute('style')).not.toContain('12px');
  expect(errors).toEqual([]);
});

test('keyed items remain isolated and styles are released after navigation', async ({ page }) => {
  await page.goto('/#/__core-test');
  await page.getByRole('button', { name: 'Resize', exact: true }).click();
  const rowA = page.getByTestId('row-a');
  await expect(rowA).toHaveCSS('width', '160px');
  const className = await rowA.getAttribute('class');
  await page.getByRole('button', { name: 'Reverse', exact: true }).click();
  await expect(rowA).toHaveAttribute('class', className!);
  await expect(page.getByTestId('row-b')).toHaveCSS('width', '200px');
  await page.getByRole('button', { name: 'Remove A', exact: true }).click();
  await expect(rowA).toHaveCount(0);
  await page.getByRole('navigation').getByRole('link', { name: '概览' }).click();
  await expect(page.locator('style[data-zui="z"]')).toHaveCount(0);
});
