import typescript from "rollup-plugin-typescript2"
import injectProcessEnv from "rollup-plugin-inject-process-env"
import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import { terser } from "rollup-plugin-terser"
import run from "@rollup/plugin-run"
import pkg from "./package.json"

const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
]

export default [
  {
    input: "src/index.ts",
    cache: true,
    output: {
      file: pkg.main,
      format: "cjs",
      sourcemap: true,
    },
    plugins: [
      commonjs(),
      resolve(),
      typescript({ typescript: require("typescript"), tsconfig: "tsconfig.json" }),
      process.env.NODE_ENV === "production" && injectProcessEnv({ NODE_ENV: "production" }), // minify, but only in production
      process.env.NODE_ENV === "production" && terser(), // minify, but only in production
      process.env.NODE_ENV !== "production" && run(),
    ],
    external,
  },
]
