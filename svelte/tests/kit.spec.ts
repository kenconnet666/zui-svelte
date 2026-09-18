import { expect, test } from '@playwright/test';

test('SvelteKit returns the styled shell before server data is released', async ({ baseURL }) => {
  const gate = crypto.randomUUID();
  const response = await fetch(baseURL + '/?gate=' + gate);
  const reader = response.body!.getReader();
  try {
    const first = new TextDecoder().decode((await reader.read()).value);
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
