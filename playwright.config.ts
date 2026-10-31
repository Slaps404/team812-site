import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  outputDir: 'test-results',
  fullyParallel: true,
  reporter: 'line',
  use: {
    baseURL: 'http://127.0.0.1:4516',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'npm run build && npm run preview -- --host 127.0.0.1 --port 4516',
    env: { ASTRO_PREVIEW_BACKGROUND: '0' },
    url: 'http://127.0.0.1:4516',
    reuseExistingServer: false,
  },
  projects: [
    {
      name: 'mobile-safari',
      testMatch: ['sponsors-layout.spec.ts', 'page-bottom.spec.ts'],
      use: { ...devices['iPhone 13'], channel: undefined },
    },
    {
      name: 'mobile',
      use: { ...devices['Desktop Chrome'], channel: 'chrome', viewport: { width: 390, height: 844 } },
    },
    {
      name: 'desktop',
      use: { ...devices['Desktop Chrome'], channel: 'chrome', viewport: { width: 1440, height: 900 } },
    },
  ],
});
