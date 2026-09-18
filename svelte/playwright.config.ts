import { defineConfig, devices } from '@playwright/test';
import { fileURLToPath } from 'node:url';

const dev = process.env.ZUI_KIT_DEV === '1';
if (dev && process.env.CI) throw new Error('CI must test production Kit output.');

export default defineConfig({
  testDir: './tests',
  testMatch: process.env.ZUI_KIT_DIRECTORY ? ['kit.spec.ts', 'package.spec.ts'] : 'kit.spec.ts',
  outputDir: process.env.ZUI_KIT_DIRECTORY ? 'test-results/packages' : 'test-results/kit',
  forbidOnly: true,
  use: { baseURL: 'http://127.0.0.1:4179', trace: 'retain-on-failure' },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], ...(dev ? { channel: 'chrome' } : {}) },
    },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
  webServer: {
    command: dev
      ? 'node ../../node_modules/vite/bin/vite.js --host 127.0.0.1 --port 4179 --strictPort'
      : 'node dist/index.js',
    cwd: process.env.ZUI_KIT_DIRECTORY ?? fileURLToPath(new URL('./tests/kit', import.meta.url)),
    env: { PORT: '4179', HOST: '127.0.0.1', ORIGIN: 'http://127.0.0.1:4179' },
    url: 'http://127.0.0.1:4179',
    reuseExistingServer: false,
  },
});
