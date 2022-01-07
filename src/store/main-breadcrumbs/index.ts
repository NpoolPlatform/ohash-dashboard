import { Module } from 'vuex'
import { RootState } from '../index'
import { state, MainBreadcrumbsState } from './state'
import { MainBreadcrumbsGetters, getters } from './getters'
import { MainBreadcrumbsMutations, mutations } from './mutations'

const mainBreadcrumbs: Module<MainBreadcrumbsState, RootState> = {
  // namespaced: true,
  getters,
  mutations,
  state
}

export {
  mainBreadcrumbs, MainBreadcrumbsState,
  mutations, MainBreadcrumbsMutations,
  getters, MainBreadcrumbsGetters
}
