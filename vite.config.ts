/** @format */

import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: "./src/setupTest.ts",
    include: ["src/**/*.test.tsx"],
    globals:true,
  },
});
