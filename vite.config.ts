import { defineConfig } from "vitest/config";

export default defineConfig({
  // Vite dev server configuration
  root: "example",
  server: {
    port: 3000,
    open: true,
  },

  // Vitest configuration
  test: {
    root: ".",  // Set test root to project root
    globals: true,
    environment: "node",
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/**",
        "dist/**",
        "example/**",
        "**/*.test.ts",
        "**/*.config.ts",
      ],
    },
  },
});
