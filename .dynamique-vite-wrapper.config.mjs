import userConfig from './vite.config.ts';
import dynamiquePreview from '/root/dynamique-preview-plugin.mjs';
const resolved = typeof userConfig === 'function' ? userConfig({ mode: 'development', command: 'serve' }) : userConfig;
const config = resolved instanceof Promise ? await resolved : resolved;
config.plugins = config.plugins || [];
config.plugins.push(dynamiquePreview({ framework: 'react', appDir: '/root/user-repo' }));
config.server = config.server || {};
config.server.hmr = config.server.hmr || {};
if (typeof config.server.hmr === 'object') {
  config.server.hmr.host = undefined;
}
config.server.watch = config.server.watch || {};
config.server.watch.usePolling = true;
config.server.watch.interval = 500;
config.server.fs = config.server.fs || {};
config.server.fs.allow = [...(config.server.fs.allow || []), '/root/user-repo'];
config.server.allowedHosts = true;
config.server.host = '0.0.0.0';
export default config;
