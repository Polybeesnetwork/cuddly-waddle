import { defineConfig } from 'vite';
import { resolve } from 'node:path';
export default defineConfig({
  server: { host: '0.0.0.0', allowedHosts: true },
  build: { rollupOptions: { input: { main: resolve(process.cwd(), 'index.html'), campaign: resolve(process.cwd(), 'campaign.html'), contract: resolve(process.cwd(), 'contract.html'), gasPlanner: resolve(process.cwd(), 'gas-planner.html') } } }
});
