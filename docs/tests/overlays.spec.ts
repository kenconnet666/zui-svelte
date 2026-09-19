import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('long panels scroll within the viewport and repeated dialogs release their layer resources', async ({
  page,
}) => {
  await page.goto('/#/overlays');
  await page.getByLabel('启用动效').uncheck();
  await page.getByRole('button', { name: '打开长内容面板' }).click();
  const popup = page.getByRole('dialog', { name: '长内容面板', includeHidden: true });
  await expect(popup).toBeVisible();
  const viewport = popup.locator('[data-zui-scroll-viewport]');
  await expect
    .poll(() => viewport.evaluate((node) => node.scrollHeight > node.clientHeight))
    .toBe(true);
  const box = (await popup.boundingBox())!;
  expect(box.y).toBeGreaterThanOrEqual(0);
  expect(box.y + box.height).toBeLessThanOrEqual(page.viewportSize()!.height + 1);
  await page.keyboard.press('Escape');
  await expect(popup).toHaveCount(0);
  const styles = () =>
    page
      .locator('style[data-zui]')
      .evaluateAll((nodes) =>
        nodes.reduce(
          (sum, node) => sum + ((node as HTMLStyleElement).sheet?.cssRules.length ?? 0),
          0,
        ),
      );
  let baseline = 0;
  for (let index = 0; index < 20; index++) {
    await page.getByRole('button', { name: '打开设置弹窗' }).click();
    await expect(page.getByRole('dialog', { name: '布局设置', exact: true })).toBeVisible();
    await page.getByRole('button', { name: '完成设置' }).click();
    await expect(page.locator('html')).not.toHaveAttribute('data-zui-scroll-lock');
    await expect(page.locator('style[data-zui^="zui-layer-"]')).toHaveCount(0);
    if (index === 4) baseline = await styles();
  }
  expect(await styles()).toBe(baseline);
});

test('complete dialogs compose nested popovers and return focus in order', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/#/overlays');
  const opener = page.getByRole('button', { name: '打开设置弹窗' });
  await opener.click();
  const dialog = page.getByRole('dialog', { name: '布局设置', exact: true });
  await expect(dialog).toBeVisible();
  await expect(dialog.locator('.custom-dialog-body')).toBeVisible();
  await page.getByLabel('设置名称').fill('保留的内容');
  const trigger = dialog.getByRole('button', { name: '打开筛选面板' });
  await trigger.click();
  const popup = page.getByRole('dialog', { name: '筛选面板', includeHidden: true });
  await expect(popup).toBeVisible();
  await expect(page.getByLabel('筛选查询')).toBeFocused();
  expect(
    await popup.evaluate((node) => Boolean(node.parentElement?.closest('[role="dialog"]'))),
  ).toBe(true);
  await page.keyboard.press('Escape');
  await expect(popup).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await dialog.getByRole('button', { name: '打开确认弹窗' }).click();
  await expect(page.getByRole('dialog', { name: '第二层确认' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog', { name: '第二层确认', includeHidden: true })).toHaveCount(
    0,
  );
  await expect(dialog).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(opener).toBeFocused();
  await expect(page.locator('html')).not.toHaveAttribute('data-zui-scroll-lock');
  await opener.click();
  await expect(page.getByLabel('设置名称')).toHaveValue('保留的内容');
  expect(errors).toEqual([]);
});

test('popover Tab order, cancelable closing and tooltip descriptions use native semantics', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/#/overlays');
  const tooltipTrigger = page.getByRole('button', { name: '查看提示' });
  await tooltipTrigger.focus();
  await expect(page.getByRole('tooltip')).toBeVisible();
  await expect(tooltipTrigger).toHaveAttribute('aria-describedby', /existing-description/u);
  const tooltipId = await page.getByRole('tooltip').getAttribute('id');
  expect((await tooltipTrigger.getAttribute('aria-describedby'))!.split(' ')).toContain(tooltipId);
  await page.keyboard.press('Escape');
  await expect(page.getByRole('tooltip', { includeHidden: true })).toHaveCount(0);
  await expect(tooltipTrigger).toHaveAttribute('aria-describedby', 'existing-description');
  await page.getByLabel('阻止弹窗关闭').check();
  await page.getByRole('button', { name: '打开设置弹窗' }).click();
  await page.keyboard.press('Escape');
  const dialog = page.getByRole('dialog', { name: '布局设置', exact: true });
  await expect(dialog).toBeVisible();
  await page.getByRole('button', { name: '打开筛选面板' }).click();
  await page.getByRole('button', { name: '完成筛选' }).focus();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', { name: '打开确认弹窗' })).toBeFocused();
  await expect(page.getByRole('dialog', { name: '筛选面板', includeHidden: true })).toHaveCount(0);
  await page.getByRole('button', { name: '允许关闭' }).click();
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  expect(errors).toEqual([]);
});

test('drawer respects RTL and portal content retains input state', async ({ page }) => {
  await page.goto('/#/overlays');
  await page.getByLabel('Portal 输入').fill('保持');
  await page.getByRole('button', { name: '切换挂载位置' }).click();
  await expect(page.getByTestId('portal-destination').getByLabel('Portal 输入')).toHaveValue(
    '保持',
  );
  await page.getByRole('button', { name: '切换方向' }).click();
  await page.getByRole('button', { name: '切换局部主题' }).click();
  await page.getByRole('button', { name: '打开详情抽屉' }).click();
  const drawer = page.getByRole('dialog', { name: '详情', exact: true });
  await expect(drawer).toBeVisible();
  await expect(drawer).toHaveCSS('color', 'rgb(0, 100, 80)');
  expect((await drawer.boundingBox())!.x).toBeLessThan(5);
  const viewport = drawer.getByRole('button', { name: '关闭' });
  await expect(viewport).toBeVisible();
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
