module.exports = {
  apps: [{
    name: "tanda-api",
    script: "./dist/index.cjs.js",
    env: { NODE_ENV: "production" },
  }],
}
