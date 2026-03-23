import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@public': path.resolve(__dirname, 'public'),
      '@': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@composables': path.resolve(__dirname, 'src/composables'),
      '@helpers': path.resolve(__dirname, 'src/helpers'),
      '@ts-types': path.resolve(__dirname, 'src/types'),
      '@stores': path.resolve(__dirname, 'src/stores'),
      '@styles': path.resolve(__dirname, 'src/styles'),
    }
  }, 
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @use '@styles/global/_constants.scss' as *;
        @use '@styles/global/_mixins.scss' as *;
        `
      }
    }
  }
})