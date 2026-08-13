import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  outputDir: 'test-results',
  reporter: 'list',
  use: {
    baseURL: 'http://127.0.0.1:48123',
    ...devices['Desktop Chrome'],
    channel: 'chrome',
  },
  webServer: {
    command: 'npm run build && npx vite preview --host 127.0.0.1 --port 48123',
    url: 'http://127.0.0.1:48123',
  },
});
