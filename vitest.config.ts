import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    tsconfigPaths(),
  ],
  test: {
    environment: 'node',
    reporters: 'verbose'
  }
})