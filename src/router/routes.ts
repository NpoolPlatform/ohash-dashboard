import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'login', component: () => import('pages/Login.vue') },
      { path: 'goods', component: () => import('pages/Goods.vue') },
      { path: 'internationalization', component: () => import('pages/Internationalization.vue') },

      // Review pages
      { path: 'review/kyc', component: () => import('pages/review/KYC.vue') },
      { path: 'review/api', component: () => import('pages/review/API.vue') },

      // Applications page
      { path: 'applications', component: () => import('pages/Applications.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
