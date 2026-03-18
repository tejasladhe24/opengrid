import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/**/*.ts", "src/**/*.tsx"],
  outDir: "dist",
  format: ["esm", "cjs"],
  dts: true,
  splitting: true,
  sourcemap: true,
  clean: true,
  outExtension: (ctx) => ({
    js: ctx.format === "esm" ? ".js" : ".cjs",
  }),
  esbuildOptions: (options) => {
    options.jsx = "automatic"
  },
})
