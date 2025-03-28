module.exports = {
  apps: [
    {
      name: "api-rastreio",
      script: "api/server.ts",
      interpreter: "node_modules/.bin/tsx",
      env: {
        NODE_ENV: "production",
        PORT: 3001
      },
      watch: false
    },
    {
      name: "frontend-rastreio",
      script: "server.mjs",
      env: {
        NODE_ENV: "production"
      },
      watch: false
    }
  ]
};