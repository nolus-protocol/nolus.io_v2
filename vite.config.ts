import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    vue(),
    svgLoader(),
  ],
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    crittersOptions: {
      reduceInlineStyles: false,
    },
    includedRoutes: async () => {
      // Generate all language routes
      const locales = ['en', 'ru', 'cn', 'es', 'fr', 'gr', 'tr', 'id', 'jp', 'kr'];
      const pages = ['/', '/about', '/governance'];
      const routes: string[] = [];
      
      locales.forEach(locale => {
        pages.forEach(page => {
          if (locale === 'en') {
            // English pages without locale prefix
            routes.push(page);
          } else {
            // Other languages with locale prefix
            routes.push(`/${locale}${page}`);
          }
        });
      });
      
      return routes;
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          // Skip manualChunks for SSR build
          if (id.includes('node_modules')) {
            if (id.includes('vue') || id.includes('vue-router')) {
              return 'vue-vendor'
            }
            if (id.includes('@headlessui/vue')) {
              return 'headless-ui'
            }
            if (id.includes('@heroicons/vue')) {
              return 'icons'
            }
            if (id.includes('lottie-web') || id.includes('@vueuse/motion')) {
              return 'animations'
            }
            if (id.includes('@cosmjs') || id.includes('@keplr-wallet')) {
              return 'blockchain'
            }
            if (id.includes('marked')) {
              return 'utils'
            }
          }
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
} as any)
