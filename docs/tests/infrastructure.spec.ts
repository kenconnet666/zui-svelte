import { expect, test } from '@playwright/test';

test('portal theme, direction and floating geometry survive updates under strict style CSP', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.route('**/*', async (route) => {
    if (route.request().resourceType() !== 'document') return route.continue();
    const response = await route.fetch();
    await route.fulfill({
      response,
      headers: {
        ...response.headers(),
        'content-security-policy':
          "script-src 'self'; style-src 'self' 'nonce-infra-probe'; style-src-attr 'none'",
      },
    });
  });
  await page.goto('/#/__infrastructure-test');
  await page.getByTestId('floating-anchor').click();
  const panel = page.getByTestId('floating-panel');
  await expect(panel).toBeVisible();
  await expect(panel).toHaveAttribute('data-placement', /^top/u);
  await expect(panel).toHaveCSS('color', 'rgb(200, 0, 0)');
  await expect(panel).not.toHaveAttribute('style');
  await page.getByRole('button', { name: '更新 Portal 主题' }).click();
  await expect(panel).toHaveCSS('color', 'rgb(0, 0, 200)');
  await expect(panel).toHaveAttribute('dir', 'rtl');
  await page.setViewportSize({ width: 600, height: 500 });
  await expect.poll(async () => (await panel.boundingBox())!.x).toBeLessThan(420);
  await page.getByTestId('floating-anchor').click();
  await expect(panel).toHaveCount(0);
  expect(errors).toEqual([]);
});

test('ten thousand rows stay windowed while active nodes and dynamic measurements remain valid', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/#/__infrastructure-test');
  const list = page.getByTestId('virtual-list');
  await expect(page.locator('#virtual-option-0')).toBeVisible();
  await expect.poll(() => page.getByTestId('virtual-row').count()).toBeLessThan(20);
  await page.getByRole('button', { name: '最后一项' }).click();
  await expect(page.locator('#virtual-option-9999')).toBeInViewport();
  await list.evaluate((node) => {
    node.scrollTop = 0;
  });
  await expect(page.locator('#virtual-option-0')).toBeInViewport();
  await expect(page.locator('#virtual-option-9999')).toHaveCount(1);
  await page.getByRole('button', { name: '改变行高' }).click();
  await expect(page.locator('#virtual-option-1')).toHaveCSS('top', '54px');
  await expect.poll(() => page.getByTestId('virtual-row').count()).toBeLessThan(20);
  await page.getByRole('button', { name: '切换集合' }).click();
  await expect(list).toHaveCount(0);
  await page.getByRole('button', { name: '切换集合' }).click();
  await expect(list).toBeVisible();
  expect(errors).toEqual([]);
});
