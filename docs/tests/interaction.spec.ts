import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('keyboard scopes preserve native editing and IME while pointer capture cancels cleanly', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/#/__interaction-test');
  const slider = page.getByRole('slider');
  await slider.focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByTestId('key-count')).toHaveText('1');
  await slider.dispatchEvent('keydown', { key: 'ArrowRight', isComposing: true, bubbles: true });
  await page.keyboard.press('Control+ArrowRight');
  await page.keyboard.press('Escape');
  await page.getByRole('textbox').focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByTestId('key-count')).toHaveText('1');
  const rect = (await slider.boundingBox())!;
  await page.mouse.move(rect.x + 10, rect.y + 10);
  await page.mouse.down();
  await page.mouse.move(rect.x + 120, rect.y + 10);
  await page.mouse.up();
  await expect(page.getByTestId('drag-state')).toHaveText('complete');
  await page.mouse.move(rect.x + 10, rect.y + 10);
  await page.mouse.down();
  await slider.dispatchEvent('pointercancel', { pointerId: 1 });
  await page.mouse.up();
  await expect(page.getByTestId('drag-state')).toHaveText('canceled');
  await page.getByRole('button', { name: '切换交互宿主' }).click();
  await expect(slider).toHaveCount(0);
  expect(errors).toEqual([]);
});

test('announcements are scoped, motion respects preference and the probe passes axe', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce', forcedColors: 'active' });
  await page.goto('/#/__interaction-test');
  await page.getByRole('button', { name: '播报结果' }).click();
  await expect(page.locator('[aria-live="polite"]')).toHaveText('找到三个结果');
  await page.getByRole('button', { name: '播报结果' }).click();
  await expect(page.locator('[aria-live="polite"]')).toHaveText('找到三个结果');
  await page.getByRole('button', { name: '播报错误' }).click();
  await expect(page.locator('[aria-live="assertive"]')).toHaveText('保存失败');
  await page.getByRole('button', { name: '测试动效' }).click();
  await expect(page.getByTestId('animation-count')).toHaveText('1');
  expect(await page.evaluate(() => document.getAnimations().length)).toBe(0);
  const result = await new AxeBuilder({ page }).analyze();
  expect(result.violations).toEqual([]);
  await page.getByRole('button', { name: '切换交互宿主' }).click();
  await expect(page.locator('[aria-live]')).toHaveCount(0);
});
