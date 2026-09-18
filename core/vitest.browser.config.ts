import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';

export default defineConfig({
  test: {
    include: ['tests/browser.test.ts'],
    browser: {
      enabled: true,
      headless: true,
      screenshotDirectory: './test-results/screenshots',
      // 本地聚焦验证可复用已安装 Chrome；CI 默认仍使用锁定的 Playwright 浏览器。
      provider: playwright({
        launchOptions: process.env.ZUI_BROWSER_CHANNEL
          ? { channel: process.env.ZUI_BROWSER_CHANNEL }
          : {},
      }),
      instances: [{ browser: 'chromium' }, { browser: 'firefox' }, { browser: 'webkit' }],
    },
  },
});
