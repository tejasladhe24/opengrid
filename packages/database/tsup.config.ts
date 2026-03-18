import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/**/*.ts"],
  outDir: "dist",
  format: ["esm", "cjs"],
  dts: true,
  splitting: true,
  sourcemap: true,
  clean: true,
  outExtension: (ctx) => ({
    js: ctx.format === "esm" ? ".js" : ".cjs",
  }),
})
