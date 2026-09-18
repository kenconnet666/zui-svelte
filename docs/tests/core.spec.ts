import { expect, test } from '@playwright/test';

test('composes theme preferences and respects direction and reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference', forcedColors: 'none' });
  await page.goto('/#/__preferences-test');
  const control = page.getByTestId('preference-control');
  await expect(control).toHaveCSS('height', '36px');
  await expect(control).toHaveCSS('color', 'rgb(15, 23, 42)');
  await expect(control).toHaveCSS('transition-duration', '0.2s');
  await expect(page.getByTestId('preference-disabled')).toBeDisabled();
  await page.getByRole('button', { name: 'Toggle dark' }).click();
  await expect(control).toHaveCSS('color', 'rgb(248, 250, 252)');
  await page.getByRole('button', { name: 'Toggle compact' }).click();
  await expect(control).toHaveCSS('height', '28px');
  await expect(control).toHaveCSS('color', 'rgb(248, 250, 252)');
  await page.getByRole('button', { name: 'Toggle contrast' }).click();
  await expect(control).toHaveCSS('color', 'rgb(255, 255, 255)');
  await expect(control).toHaveCSS('border-top-width', '2px');
  await expect(control).toHaveCSS('height', '28px');
  await page.getByRole('button', { name: 'Toggle direction' }).click();
  await expect(control).toHaveCSS('direction', 'rtl');
  await expect(control).toHaveCSS('padding-right', '16px');
  await expect(control).toHaveCSS('padding-left', '8px');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(control).toHaveCSS('transition-duration', '0s');
  await page.keyboard.press('Tab');
  await control.focus();
  await expect(control).toHaveCSS('outline-width', '2px');
  await page.emulateMedia({ forcedColors: 'active' });
  const forced = await page.evaluate(() => matchMedia('(forced-colors: active)').matches);
  const info = test.info();
  info.annotations.push({
    type: 'forced-colors-media',
    description: forced
      ? 'active'
      : 'engine did not activate emulation; forced color comparison unavailable',
  });
  if (forced) {
    const systemText = await control.evaluate((node) => {
      // 系统颜色受原生控件与最近 color-scheme 影响，参考节点必须在同一主题中。
      const reference = document.createElement('button');
      reference.type = 'button';
      reference.style.color = 'CanvasText';
      node.parentElement!.append(reference);
      const color = getComputedStyle(reference).color;
      reference.remove();
      return color;
    });
    await expect(control).toHaveCSS('color', systemText);
  }
});

test('provider scopes update, replace and release without taking ownership of shared scopes', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/#/__provider-test');
  const root = page.getByTestId('provider-root');
  const shared = page.getByTestId('provider-shared');
  await expect(root).toHaveCSS('color', 'rgb(255, 0, 0)');
  await expect(shared).toHaveCSS('color', 'rgb(255, 0, 0)');
  await expect(page.getByTestId('provider-portal')).toHaveCSS('color', 'rgb(255, 0, 0)');
  await expect(page.getByTestId('provider-shadow')).toHaveCSS('color', 'rgb(255, 0, 0)');
  await expect(page.getByTestId('provider-child')).toHaveCSS('color', 'rgb(0, 0, 255)');
  await expect(page.getByTestId('provider-container')).toHaveCSS('padding-top', '7px');
  await expect(page.getByTestId('provider-container')).toHaveClass(/custom-provider/u);
  expect(await page.getByTestId('provider-container').evaluate((node) => node.tagName)).toBe(
    'SECTION',
  );
  await root.click();
  await expect(page.getByTestId('provider-clicks')).toHaveText('1');
  const count = await page.locator('style[data-zui="provider"]').count();
  await page.getByRole('button', { name: 'Switch theme 100 times' }).click();
  await expect(page.getByTestId('provider-completed')).toHaveText('1');
  await expect(root).toHaveCSS('color', 'rgb(0, 128, 0)');
  await expect(shared).toHaveCSS('color', 'rgb(0, 128, 0)');
  await expect(page.getByTestId('provider-portal')).toHaveCSS('color', 'rgb(0, 128, 0)');
  await expect(page.getByTestId('provider-shadow')).toHaveCSS('color', 'rgb(0, 128, 0)');
  await expect(page.getByTestId('provider-child')).toHaveCSS('color', 'rgb(0, 0, 255)');
  await expect(page.locator('style[data-zui="provider"]')).toHaveCount(count);
  await page.getByRole('button', { name: 'Replace scope' }).click();
  await expect(root).toHaveCSS('color', 'rgb(128, 0, 128)');
  await expect(shared).toHaveCSS('color', 'rgb(0, 128, 0)');
  await page.getByRole('button', { name: 'Toggle provider' }).click();
  await expect(root).toHaveCount(0);
  await page.getByRole('button', { name: 'Switch theme 100 times' }).click();
  await expect(page.getByTestId('provider-completed')).toHaveText('2');
  await expect(shared).toHaveCSS('color', 'rgb(0, 128, 0)');
  await page.getByRole('button', { name: 'Dispose scope' }).click();
  await expect
    .poll(() =>
      page
        .locator('style[data-zui="provider"]')
        .allTextContents()
        .then((items) => items.join('')),
    )
    .not.toContain(':where(.provider-theme-');
  expect(errors).toEqual([]);
  await page.getByRole('navigation').getByRole('link', { name: '概览' }).click();
  await expect(page.locator('style[data-zui="provider"]')).toHaveCount(0);
  await expect(page.getByTestId('provider-portal')).toHaveCount(0);
  await expect(page.getByTestId('provider-shadow')).toHaveCount(0);
});

test('ordinary class bindings do not create a style runtime or inject theme rules', async ({
  page,
}) => {
  await page.goto('/#/__plain-class-test');
  const target = page.getByTestId('plain-class');
  await expect(target).toHaveClass('ordinary');
  await expect(target).toHaveCSS('color', 'rgb(255, 0, 0)');
  await expect(page.locator('style[data-zui]')).toHaveCount(0);
  await page.getByRole('button', { name: 'Toggle plain class' }).click();
  await expect(target).toHaveClass('ordinary active');
  await expect(page.locator('style[data-zui]')).toHaveCount(0);
});

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
  await expect(page.getByTestId('by-callback')).toHaveCSS('width', '201px');
  await expect(page.getByTestId('seeded')).toHaveCSS('width', '99px');
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
  await expect(page.getByText('module script snapshot', { exact: true })).toHaveCSS(
    'width',
    '193px',
  );
  await expect(page.getByTestId('mapped-panel-0')).toHaveCSS('width', '203px');
  await expect(page.getByTestId('mapped-panel-1')).toHaveCSS('width', '213px');
  await expect(page.getByTestId('receiver-panel')).toHaveCSS('width', '233px');
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
