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
      { path: 'review/good', component: () => import('pages/review/Good.vue') },

      // Applications page
      { path: 'applications/applications', component: () => import('pages/applications/Applications.vue') },
      { path: 'applications/email/template', component: () => import('pages/applications/ApplicationEmailTemplate.vue') },
      { path: 'applications/sms/template', component: () => import('pages/applications/ApplicationSMSTemplate.vue') },
      { path: 'applications/contacts', component: () => import('pages/applications/ApplicationContact.vue') },
      { path: 'applications/languages', component: () => import('pages/applications/ApplicationLanguages.vue') },

      // API list
      { path: 'apis', component: () => import('pages/API.vue') },

      // User list
      { path: 'users/users', component: () => import('pages/users/Users.vue') },
      { path: 'users/roles', component: () => import('pages/users/Roles.vue') },
      { path: 'users/auth/histories', component: () => import('pages/users/AuthHistories.vue') },
      { path: 'users/roleusers', component: () => import('pages/users/RoleUsers.vue') },
      { path: 'users/roleauths', component: () => import('pages/users/RoleAuths.vue') }
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
