import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

// Gherkin .feature dosyaları bddgen ile .features-gen/ altına Playwright spec'lerine derlenir
const bddTestDir = defineBddConfig({
  features: './features/**/*.feature',
  steps: './features/steps/**/*.ts',
});

export default defineConfig({
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [
    ['html', { open: 'never' }],
    ['list'],
  ],

  use: {
    baseURL: 'https://www.saucedemo.com',
    testIdAttribute: 'data-test',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    // BDD senaryoları: üç tarayıcıda
    { name: 'bdd-chromium', testDir: bddTestDir, use: { ...devices['Desktop Chrome'] } },
    { name: 'bdd-firefox', testDir: bddTestDir, use: { ...devices['Desktop Firefox'] } },
    { name: 'bdd-webkit', testDir: bddTestDir, use: { ...devices['Desktop Safari'] } },
    // Aynı POM katmanını kullanan klasik Playwright spec'leri
    { name: 'spec-chromium', testDir: './tests', use: { ...devices['Desktop Chrome'] } },
  ],
});
