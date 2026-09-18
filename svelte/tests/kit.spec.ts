import { expect, test } from '@playwright/test';

test('hydrates legacy component state under stylesheet CSP and promotes after hydration', async ({
  page,
  request,
}) => {
  const html = await (await request.get('/legacy')).text();
  expect(html).toContain('width:101px');
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/legacy');
  const target = page.getByTestId('legacy-route');
  await expect(target).toHaveCSS('width', '101px');
  await page.getByRole('button', { name: 'Resize legacy route', exact: true }).click();
  await expect(target).toHaveCSS('width', '111px');
  const name = await target.getAttribute('class');
  await page.getByRole('button', { name: 'Resize legacy route', exact: true }).click();
  await expect(target).toHaveCSS('width', '121px');
  await expect(target).toHaveText('size:121');
  expect(await target.getAttribute('class')).toBe(name);
  expect(await target.getAttribute('style')).toBeNull();
  expect(errors).toEqual([]);
});

test('hydrates unkeyed reuse, object keys and recursive snippets', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/structure');
  for (const name of ['unkeyed', 'object-key']) {
    await expect(page.getByTestId(name).nth(0)).toHaveCSS('width', '101px');
    await expect(page.getByTestId(name).nth(1)).toHaveCSS('width', '202px');
  }
  await expect(page.locator('[data-depth="2"]')).toHaveCSS('width', '72px');
  await page.getByRole('button', { name: 'Change structure', exact: true }).click();
  for (const name of ['unkeyed', 'object-key']) {
    await expect(page.getByTestId(name).nth(0)).toHaveCSS('width', '202px');
    await expect(page.getByTestId(name).nth(1)).toHaveCSS('width', '101px');
  }
  for (let depth = 0; depth <= 3; depth++)
    await expect(page.locator('[data-depth="' + depth + '"]')).toHaveCSS(
      'width',
      70 + depth + 'px',
    );
  expect(errors).toEqual([]);
});

test('switches theme variables without replacing the consuming class', async ({ page }) => {
  await page.goto('/theme');
  const target = page.getByTestId('scheme-target');
  await expect(target).toHaveCSS('color-scheme', 'light');
  const className = await target.getAttribute('class');
  await page.getByRole('button', { name: 'Preview dark', exact: true }).click();
  await expect(target).toHaveCSS('color-scheme', 'dark');
  await expect(target).toHaveCSS('color', 'rgb(248, 250, 252)');
  expect(await target.getAttribute('class')).toBe(className);
  await page.getByRole('button', { name: 'Preview light', exact: true }).click();
  await expect(target).toHaveCSS('color', 'rgb(15, 23, 42)');
});

test.describe('request theme without JavaScript', () => {
  test.use({ javaScriptEnabled: false });
  test('defaults to light and renders the saved dark scheme on the next response', async ({
    page,
  }) => {
    await page.goto('/theme');
    await expect(page.getByTestId('scheme-target')).toHaveCSS('color-scheme', 'light');
    await page.getByRole('button', { name: 'Save dark', exact: true }).click();
    await expect(page.getByTestId('scheme-target')).toHaveCSS('color-scheme', 'dark');
    await page.reload();
    await expect(page.getByTestId('scheme-target')).toHaveCSS('color', 'rgb(248, 250, 252)');
  });
});

test('composes real Kit handles and keeps error-page styles and redirect headers', async ({
  request,
}) => {
  const response = await request.get('/failure');
  expect(response.status()).toBe(500);
  expect(response.headers()['x-zui-sequence']).toBe('kept');
  const html = await response.text();
  expect(html).toContain('Error 500');
  expect(html).toContain('var(--z-color-danger)');
  expect(html).toContain('name="zui-sequence"');
  const redirect = await request.get('/redirect', { maxRedirects: 0 });
  expect(redirect.status()).toBe(303);
  expect(redirect.headers().location).toBe('/');
  expect(redirect.headers()['x-zui-sequence']).toBe('kept');
});

test('SvelteKit returns the styled shell before server data is released', async ({ baseURL }) => {
  const gate = crypto.randomUUID();
  const response = await fetch(baseURL + '/?gate=' + gate);
  const reader = response.body!.getReader();
  try {
    // 网络分块不等于 HTML 分块；读到 shell 标记即可，不能假设第一次 read 包含整页。
    const decoder = new TextDecoder();
    let first = '';
    while (!first.includes('initial-shell')) {
      const chunk = await reader.read();
      expect(chunk.done).toBe(false);
      first += decoder.decode(chunk.value, { stream: true });
      expect(first.length).toBeLessThan(128 * 1024);
    }
    expect(first).toContain('initial-shell');
    expect(first).toContain('width:120px');
    expect(first).not.toContain('stream-ready');
    await fetch(baseURL + '/release?gate=' + gate);
    let tail = '';
    for (;;) {
      const chunk = await reader.read();
      if (chunk.done) break;
      tail += new TextDecoder().decode(chunk.value);
    }
    expect(tail).toContain('stream-ready');
  } finally {
    await fetch(baseURL + '/release?gate=' + gate);
    await reader.cancel();
  }
});

test('SvelteKit streams deferred data after styled shell and hydrates dynamic classes', async ({
  page,
  request,
}) => {
  const response = await request.get('/?width=173');
  const html = await response.text();
  expect(html).toContain('width:173px');
  expect(html).toContain('initial-shell');
  const errors: string[] = [];
  await page.addInitScript(() => {
    const violations: string[] = [];
    Reflect.set(window, 'cspViolations', violations);
    document.addEventListener('securitypolicyviolation', (event) =>
      violations.push(event.violatedDirective),
    );
  });
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/?width=173');
  await expect(page.getByTestId('kit-target')).toHaveCSS('width', '173px');
  await page.getByRole('button', { name: 'Resize' }).click();
  await expect(page.getByTestId('kit-target')).toHaveCSS('width', '193px');
  await expect(page.getByTestId('late-target')).toHaveCSS('color', 'rgb(255, 0, 0)');
  expect(await page.getByTestId('kit-target').getAttribute('style')).toBeNull();
  expect(await page.evaluate(() => Reflect.get(window, 'cspViolations'))).toEqual([]);
  expect(errors).toEqual([]);
});
