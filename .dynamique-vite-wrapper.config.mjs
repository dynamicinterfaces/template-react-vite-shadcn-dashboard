import userConfig from './vite.config.ts';
import dynamiquePreview from '/root/dynamique-preview-plugin.mjs';
const resolved = typeof userConfig === 'function' ? userConfig({ mode: 'development', command: 'serve' }) : userConfig;
const config = resolved instanceof Promise ? await resolved : resolved;
config.plugins = config.plugins || [];
config.plugins.push(dynamiquePreview({ framework: 'react', appDir: '/root/user-repo' }));
// HMR: let Vite auto-detect protocol/port from the page's origin.
// Don't hardcode wss/443 — breaks localhost access (Playwright captures, internal tools).
// Vite 6 auto-detects: http → ws, https → wss, and uses the page's port.
config.server = config.server || {};
config.server.hmr = config.server.hmr || {};
if (typeof config.server.hmr === 'object') {
  config.server.hmr.host = undefined;
}
// Enable polling for file watcher — inotify doesn't work in containers
config.server.watch = config.server.watch || {};
config.server.watch.usePolling = true;
config.server.watch.interval = 500;
// Allow serving files from the entire repo root (monorepo packages outside Vite root)
config.server.fs = config.server.fs || {};
config.server.fs.allow = [...(config.server.fs.allow || []), '/root/user-repo'];
// Allow all hosts (Modal tunnel URLs) — env var __VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS
// doesn't work reliably in Vite 6, so set it explicitly
config.server.allowedHosts = true;
// Bind to all interfaces so Modal tunnel can reach Vite
config.server.host = '0.0.0.0';
export default config;
