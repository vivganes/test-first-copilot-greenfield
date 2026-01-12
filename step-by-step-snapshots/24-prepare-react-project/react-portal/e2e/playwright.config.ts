import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e/tests',
  timeout: 30000,
  use: {
    baseURL: 'http://localhost:3000',
    browserName: 'chromium',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    headless: true,
  },
});