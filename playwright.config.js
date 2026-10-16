import { defineConfig, devices } from '@playwright/test';

// BASE_URL=https://gpsr.jalonel.com/ npx playwright test   -> checks the live site
const live = process.env.BASE_URL;
export default defineConfig({
  testDir: 'tests/e2e',
  workers: 1,
  retries: live ? 1 : 0,
  reporter: [['list']],
  use: { baseURL: live ?? 'http://localhost:4791/', acceptDownloads: true },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Desktop Chrome'], viewport: { width: 390, height: 844 }, isMobile: false } },
  ],
  webServer: live ? undefined : { command: 'node scripts/serve.mjs dist 4791', url: 'http://localhost:4791/', reuseExistingServer: true },
});
