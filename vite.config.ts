import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      models: path.resolve(__dirname, './src/models'),
      theme: path.resolve(__dirname, './src/theme'),
      state: path.resolve(__dirname, './src/state'),
      data: path.resolve(__dirname, './src/data'),
      pages: path.resolve(__dirname, './src/pages'),
      components: path.resolve(__dirname, './src/components'),
      utils: path.resolve(__dirname, './src/utils'),
      hooks: path.resolve(__dirname, './src/hooks'),
    },
  },
});
