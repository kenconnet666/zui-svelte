import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: 'kit.spec.ts',
  forbidOnly: true,
  use: { baseURL: 'http://127.0.0.1:4179', trace: 'retain-on-failure' },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
  webServer: {
    command: 'node tests/kit/dist/index.js',
    env: { PORT: '4179', HOST: '127.0.0.1', ORIGIN: 'http://127.0.0.1:4179' },
    url: 'http://127.0.0.1:4179',
    reuseExistingServer: false,
  },
});
