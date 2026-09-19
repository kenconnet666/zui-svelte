import { expect, test } from '@playwright/test';

test('field lifecycle, native editing and Zod share one model without losing invalid drafts', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/#/__form-test');
  await expect(page.getByRole('alert')).toHaveCount(0);
  await page.getByLabel('名称', { exact: true }).focus();
  await page.getByLabel('金额', { exact: true }).focus();
  expect(errors).toEqual([]);
  await expect(page.getByRole('alert')).toHaveText('名称至少两个字符');
  await page.getByLabel('名称', { exact: true }).fill('  张三  ');
  await page.getByLabel('金额', { exact: true }).fill('-');
  await page.getByRole('button', { name: '验证并保存' }).click();
  await expect(page.getByRole('alert')).toHaveText('金额尚未完成');
  await expect(page.getByLabel('金额', { exact: true })).toBeFocused();
  await expect(page.getByTestId('form-saved')).toBeEmpty();
  await expect(page.getByTestId('form-native')).toHaveText('1.00');
  await page.getByLabel('金额', { exact: true }).fill('0.30');
  await page.getByRole('button', { name: '验证并保存' }).click();
  await expect(page.getByTestId('form-saved')).toHaveText('张三:0.30');
  await expect(page.getByLabel('名称', { exact: true })).toHaveValue('  张三  ');
  await page.getByRole('button', { name: '恢复初值' }).click();
  await expect(page.getByTestId('form-dirty')).toHaveText('false');
  await expect(page.getByRole('alert')).toHaveCount(0);
  await page.getByRole('button', { name: '切换金额控件' }).click();
  await expect(page.getByTestId('form-controls')).toHaveText('0');
  await page.getByRole('button', { name: '切换金额控件' }).click();
  await expect(page.getByTestId('form-controls')).toHaveText('1');
  expect(errors).toEqual([]);
});

test('schema creation and validation work without unsafe-eval', async ({ page }) => {
  await page.addInitScript(() => {
    const target = window as typeof window & { scriptViolations: string[] };
    target.scriptViolations = [];
    document.addEventListener('securitypolicyviolation', (event) => {
      if (event.effectiveDirective.startsWith('script-src'))
        target.scriptViolations.push(event.blockedURI);
    });
  });
  await page.route('**/*', async (route) => {
    if (route.request().resourceType() !== 'document') return route.continue();
    const response = await route.fetch();
    await route.fulfill({
      response,
      headers: {
        ...response.headers(),
        'content-security-policy': "script-src 'self'; style-src 'self' 'unsafe-inline'",
      },
    });
  });
  await page.goto('/#/__form-test');
  await page.getByLabel('名称', { exact: true }).fill('张三');
  await page.getByRole('button', { name: '验证并保存' }).click();
  await expect(page.getByTestId('form-saved')).toHaveText('张三:1.00');
  expect(
    await page.evaluate(
      () => (window as typeof window & { scriptViolations: string[] }).scriptViolations,
    ),
  ).toEqual([]);
});
