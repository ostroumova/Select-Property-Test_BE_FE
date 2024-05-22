import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
  },
  test: {
    globals: true,
    environment: "jsdom",
    // setupFiles: ["./test/setupTests.ts"],
    coverage: {
      include: ["src/**"],
      extension: [".ts", ".tsx"],
      reporter: ["text", "html", "json-summary"],
      provider: "v8",
      all: true,
      // exclude: [
      //   ...(configDefaults.coverage.exclude ?? []),
      //   "**/types/**",
      //   "**/types.ts",
      // ],
    },
  },
});
