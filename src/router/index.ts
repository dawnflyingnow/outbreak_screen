import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import Main from '../views/Main.vue'



Vue.use(VueRouter)

const routes: RouteConfig[] = [

  {
    path: '/onepage',
    component: () => import('../views/echarts/OnePage.vue'),
    //component: Login,
    meta: { isPublic: true }
  },
  {
    path: '/twopage',
    component: () => import('../views/echarts/TwoPage.vue'),

    meta: { isPublic: true }
  },

  {
    path: '/threepage',
    component: () => import('../views/echarts/ThreePage.vue'),

    meta: { isPublic: true }
  },

  {
    path: '/',
    component: Main,
    children: [
      // { name: 'home', path: '/', component: Home },
      { name: 'page', path: '/', component: () => import('../views/echarts/Page.vue') },
      // { name: 'twopage', path: '/', component: () => import('../views/echarts/TwoPage.vue') },
      { name: 'twopage', path: '/twopage', component: () => import('../views/echarts/TwoPage.vue') },

    ]
  },
]

const router = new VueRouter({
  routes
})

// 路由导航守卫
// router.beforeEach((to, from, next) => {
//   if (!to.meta.isPublic && !localStorage.getItem('token')) {
//     return next('/twopage')
//   }
//   next()
// })

export default router
