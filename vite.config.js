import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
//import VueRouter from 'unplugin-vue-router/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    /*VueRouter({
      routesFolder: 'src/pages',
      extensions: ['.vue'],
    }),*/
  ],
  build: {
    target: ['chrome89', 'edge89', 'firefox89', 'safari15'],
    sourcemap: true
  }
})
