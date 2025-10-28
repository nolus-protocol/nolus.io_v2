import '@/assets/main.css'
import { ViteSSG } from 'vite-ssg'
import { MotionPlugin } from '@vueuse/motion'
import App from './App.vue'
import type { RouteRecordRaw } from 'vue-router'
import { META as META_HOME } from '@/router/metadata/homepage'
import { META as META_ABOUT } from '@/router/metadata/about'
import { META as META_GOVERNANCE } from '@/router/metadata/governance'
import NotFound from '@/views/NotFound.vue'

// Define routes for SSG
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('./views/HomeView.vue'),
    meta: META_HOME
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('./views/AboutView.vue'),
    meta: META_ABOUT
  },
  {
    path: '/governance',
    name: 'governance',
    component: () => import('./views/GovernanceView.vue'),
    meta: META_GOVERNANCE
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: META_HOME
  }
]

// Create SSG app
export const createApp = ViteSSG(
  App,
  { routes },
  ({ app, router, isClient }) => {
    // Add plugins
    app.use(MotionPlugin)
    
    // Client-only code
    if (isClient) {
      // Any client-specific initialization can go here
      console.log('Running in client mode')
    }
  }
)
