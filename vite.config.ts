import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    vue(),
    svgLoader(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vue-vendor': ['vue', 'vue-router'],
          'headless-ui': ['@headlessui/vue'],
          'icons': ['@heroicons/vue'],
          'animations': ['lottie-web', '@vueuse/motion'],
          'blockchain': ['@cosmjs/tendermint-rpc', '@keplr-wallet/unit'],
          'utils': ['marked']
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  optimizeDeps: {
    include: ['vue', 'vue-router', '@headlessui/vue', 'lottie-web', 'marked']
  }
})
