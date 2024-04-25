import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

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
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/pong',
      name: 'pong',
      component: () => import('../views/PongView.vue')
    },
    {
      path: '/settingsPong',
      name: 'settingsPong',
      component: () => import('../views/SetingsPongView.vue')
    },
    {
      path: '/inlog',
      name: 'inlog',
      component: () => import('../views/InlogView.vue')
    }
  ]
})

export default router