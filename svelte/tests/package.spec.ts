import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { expect, test } from '@playwright/test';

test.use({ javaScriptEnabled: false });

test('packed core styles remain usable in prerendered HTML without JavaScript', async ({
  page,
}) => {
  const html = await readFile(
    join(process.env.ZUI_KIT_DIRECTORY!, 'prerender/static.html'),
    'utf8',
  );
  // 直接消费静态产物；不允许由客户端脚本补齐首屏样式。
  await page.setContent(html);
  await expect(page.getByTestId('prerender-target')).toHaveCSS('width', '213px');
  await expect(page.getByTestId('prerender-target')).toHaveCSS('color', 'rgb(255, 0, 0)');
});
