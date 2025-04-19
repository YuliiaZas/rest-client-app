import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

const mocks = [
  './src/__tests__/context.tsx',
  './src/__tests__/firebase.tsx',
  './src/__tests__/hooks.tsx',
  './src/__tests__/next.tsx',
  './src/__tests__/next-auth.tsx',
  './src/__tests__/next-intl.tsx',
  './src/__tests__/setup.tsx',
];

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: mocks,
    exclude: ['**/node_modules/**', '**/*js', ...mocks],
    coverage: {
      provider: 'v8',
      include: ['**/*.tsx'],
      exclude: [
        '**/node_modules/**',
        '**/*.test.tsx',
        '**/*.spec.tsx',
        '**/*js',
        ...mocks,
      ],
    },
  },
});
