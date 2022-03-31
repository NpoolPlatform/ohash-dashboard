import { store } from 'quasar/wrappers'
import { InjectionKey } from 'vue'
import {
  createStore,
  Store as VuexStore,
  useStore as vuexUseStore,
  CommitOptions,
  DispatchOptions,
  ActionContext,
  MutationTree
} from 'vuex'

// ########### define your self store #################
// 1 import your store modules
import {
  user,
  UserState,
  UserMutations,
  UserActions,
  UserGetters
} from './user-helper'

import {
  mainBreadcrumbs,
  MainBreadcrumbsState,
  MainBreadcrumbsMutations,
  MainBreadcrumbsGetters
} from './main-breadcrumbs'

import {
  notifications,
  NotificationState,
  NotificationMutations,
  NotificationGetters
} from './notifications'

import {
  application,
  ApplicationState,
  ApplicationMutations,
  ApplicationGetters,
  ApplicationActions
} from './application'

import {
  reviews,
  ReviewsState,
  ReviewMutations,
  ReviewGetters,
  ReviewActions
} from './reviews'

import {
  goods,
  GoodsState,
  GoodMutations,
  GoodGetters,
  GoodActions
} from './goods'

import {
  coins,
  CoinsState,
  CoinMutations,
  CoinGetters,
  CoinActions
} from './coins'

import {
  languages,
  LanguagesState,
  LanguageMutations,
  LanguageGetters,
  LanguageActions
} from './languages'

import {
  kyc,
  KYCsState,
  KYCMutations,
  KYCGetters,
  KYCActions
} from './kycs'

import {
  appEmailTemplates,
  AppEmailTemplatesState,
  AppEmailTemplateMutations,
  AppEmailTemplateGetters,
  AppEmailTemplateActions
} from './appemailtemplates'

import {
  appSMSTemplates,
  AppSMSTemplatesState,
  AppSMSTemplateMutations,
  AppSMSTemplateGetters,
  AppSMSTemplateActions
} from './appsmstemplates'

import {
  appContacts,
  AppContactsState,
  AppContactMutations,
  AppContactGetters,
  AppContactActions
} from './appcontacts'

import {
  auths,
  AuthsState,
  AuthMutations,
  AuthGetters,
  AuthActions
} from './auths'

import {
  billings,
  BillingsState,
  BillingMutations,
  BillingGetters,
  BillingActions
} from './billing'

import {
  inspire,
  InspiresState,
  InspireMutations,
  InspireGetters,
  InspireActions
} from './inspire'

import {
  mailbox,
  MailboxState,
  MailboxMutations,
  MailboxGetters,
  MailboxActions
} from './mailbox'

// 2 combine your store to root store
export interface RootState {
  user: UserState,
  mainBreadcrumbs: MainBreadcrumbsState,
  notifications: NotificationState
  applications: ApplicationState
  reviews: ReviewsState
  goods: GoodsState
  coins: CoinsState
  languages: LanguagesState
  kyc: KYCsState
  appEmailTemplates: AppEmailTemplatesState
  appSMSTemplates: AppSMSTemplatesState
  appContacts: AppContactsState
  auths: AuthsState
  billings: BillingsState
  inspire: InspiresState
  mailbox: MailboxState
}

// 3 combine your actions, mutations and getters to root, if have multi use & combin
// for example a & b
type Actions =
  UserActions &
  ApplicationActions &
  ReviewActions &
  GoodActions &
  CoinActions &
  LanguageActions &
  KYCActions &
  AppEmailTemplateActions &
  AppSMSTemplateActions &
  AppContactActions &
  AuthActions &
  InspireActions &
  BillingActions &
  MailboxActions
type Mutations =
  UserMutations &
  MainBreadcrumbsMutations &
  NotificationMutations &
  ApplicationMutations &
  ReviewMutations &
  GoodMutations &
  CoinMutations &
  LanguageMutations &
  KYCMutations &
  AppEmailTemplateMutations &
  AppSMSTemplateMutations &
  AppContactMutations &
  AuthMutations &
  InspireMutations &
  BillingMutations &
  MailboxMutations
type Getters =
  UserGetters &
  MainBreadcrumbsGetters &
  NotificationGetters &
  ApplicationGetters &
  ReviewGetters &
  GoodGetters &
  CoinGetters &
  LanguageGetters &
  KYCGetters &
  AppEmailTemplateGetters &
  AppSMSTemplateGetters &
  AppContactGetters &
  AuthGetters &
  InspireGetters &
  BillingGetters &
  MailboxGetters

// 4 attach your module to root
export default store(function (/* { ssrContext } */) {
  const Store = createStore<RootState>({
    modules: {
      user,
      mainBreadcrumbs,
      notifications,
      application,
      reviews,
      goods,
      coins,
      languages,
      kyc,
      appEmailTemplates,
      appSMSTemplates,
      appContacts,
      auths,
      billings,
      inspire,
      mailbox
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: !!process.env.DEBUGGING
  })

  return Store
})

// ########### end define your self store #################

// provide typings for `this.$store`
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: VuexStore<RootState>
  }
}

export type AugmentedActionContext<S, R, M extends MutationTree<S>> = {
  commit<k extends keyof M> (
    type: k,
    payload: Parameters<M[k]>[1],
    options?: CommitOptions
  ): ReturnType<M[k]>
} & Omit<ActionContext<S, R>, 'commit'>

// define your store actions, dispatch and getter type
export type Store = Omit<
  VuexStore<RootState>,
  'getters' | 'commit' | 'dispatch'
> & {
  commit<k extends keyof Mutations, P extends Parameters<Mutations[k]>[1]> (
    type: k,
    payload?: P,
    options?: CommitOptions
  ): ReturnType<Mutations[k]>
} & {
  dispatch<K extends keyof Actions> (
    type: K,
    payload?: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>
  }
}

// provide typings for `useStore` helper
export const storeKey: InjectionKey<VuexStore<RootState>> = Symbol('vuex-key')

export function useStore () {
  return vuexUseStore(storeKey) as Store
}
