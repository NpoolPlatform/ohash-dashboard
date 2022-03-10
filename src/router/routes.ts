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
      { path: 'review/withdraw', component: () => import('pages/review/Withdraw.vue') },
      { path: 'review/withdraw/address', component: () => import('pages/review/WithdrawAddress.vue') },
      { path: 'review/withdraw', component: () => import('pages/review/Withdraw.vue') },
      { path: 'review/user/payment/balance', component: () => import('pages/review/UserPaymentBalance.vue') },

      // Application page
      { path: 'application/email/template', component: () => import('pages/application/ApplicationEmailTemplate.vue') },
      { path: 'application/sms/template', component: () => import('pages/application/ApplicationSMSTemplate.vue') },
      { path: 'application/contacts', component: () => import('pages/application/ApplicationContact.vue') },
      { path: 'application/languages', component: () => import('pages/application/ApplicationLanguages.vue') },
      { path: 'application/goods', component: () => import('pages/application/ApplicationGoods.vue') },

      // User list
      { path: 'users/users', component: () => import('pages/users/Users.vue') },
      { path: 'users/roles', component: () => import('pages/users/Roles.vue') },
      { path: 'users/roleusers', component: () => import('pages/users/RoleUsers.vue') },

      // Invitation Code
      { path: 'inspire/invitation/code', component: () => import('pages/inspire/InvitationCode.vue') },
      { path: 'inspire/commission', component: () => import('pages/inspire/Commission.vue') }
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
