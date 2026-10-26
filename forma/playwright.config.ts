import {defineConfig} from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  testMatch: '*.e2e.ts',
  workers: 1,
  use: {baseURL: 'http://localhost:4187', channel: 'chrome', screenshot: 'only-on-failure', launchOptions: {args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader']}},
  webServer: {command: 'npm run preview -- --host 127.0.0.1', url: 'http://localhost:4187', reuseExistingServer: false},
});
