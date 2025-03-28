module.exports = {
  apps: [
    {
      name: "api-rastreio",
      script: "api/server.ts",
      interpreter: "node_modules/.bin/tsx",
      env: {
        NODE_ENV: "production",
        PORT: 3001
      }
    },
    {
      name: "frontend-rastreio",
      script: "server-prod.mjs",
      env: {
        NODE_ENV: "production",
        PORT: 5173
      }
    }
  ]
};