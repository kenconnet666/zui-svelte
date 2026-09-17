import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: { conditions: ['zui-source', 'node'] },
  test: { include: ['tests/**/*.test.ts'], environment: 'node' },
});
