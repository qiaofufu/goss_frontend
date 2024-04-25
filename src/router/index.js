import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { GetCookie } from '../utils/cookie'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        auth: true
      },
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        auth: false
      },
      component: () => import('../views/LoginView.vue')
    }
  ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    if (GetCookie('websession')) {
      console.log('已登录')
      next()
    } else {
      console.log('未登录')
      next({ name: 'login' })
    }
  } else {
    console.log('不需要登录')
    next()
  }
})

export default router
