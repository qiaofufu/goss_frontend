import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { GetCookie } from '../utils/cookie.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        auth: false
      },
      component: HomeView,
      children: [
        {
          path: '/bucket',
          name: 'bucket',
          meta: {
            auth: false
          },
          component: () => import('../views/BucketView.vue'),
        },
        {
          path: '/add-bucket',
          meta: {
            auth: false
          },
          component: () => import('../views/AddBucketView.vue')
        },
        {
          path: '/bucket/:bucketName/admin',
          name: 'bucketManage',
          meta: {
            auth: false
          },
            component: () => import('../views/BucketAdminView.vue'),
          redirect:  to => {
            return {
              path: `/bucket/${to.params.bucketName}/admin/summary`
            };
          },
          children: [
            {
              path: '/bucket/:bucketName/admin/summary',
              meta: {
                auth: false
              },
                component: () => import('../views/BucketAdminSummaryView.vue')
            }
          ]
        },
        {
          path: '/browser',
          meta: {
            auth: false
          },
          children: [
            {
              path: '/browser',
              meta: {
                auth: false
              },
              component: () => import('../views/BrowserView.vue'),
            },
            {
              path: '/browser/:bucketName',
              name: 'bucketBrowser',
              meta: {
                auth: false
              },
              component: () => import("../views/BrowserBucket.vue")
            }
          ]
        }
      ]
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
