// vite.config.js
import ViteProxy from 'vite-plugin-proxy';

export default {
  plugins: [
    ViteProxy({
      // Your proxy configuration
      // The key is the path you want to proxy from, and the value is the target URL
      '/wp-json': {
        target: 'http://localhost',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/wp-json/, '/wp-json'),
      },
    }),
  ],
};
