import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFound from '../views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/governance',
      name: 'governance',
      component: () => import('../views/GovernanceView.vue')
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound } // 404 template
  ]
})

export default router
