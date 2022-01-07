import { Module } from 'vuex'
import { RootState } from '../index'
import { state, MainBreadcrumbsState } from './state'
import { MainBreadcrumbsActions, actions } from './actions'
import { MainBreadcrumbsGetters, getters } from './getters'
import { MainBreadcrumbsMutations, mutations } from './mutations'

const mainBreadcrumbs: Module<MainBreadcrumbsState, RootState> = {
  // namespaced: true,
  actions,
  getters,
  mutations,
  state
}

export {
  mainBreadcrumbs, MainBreadcrumbsState,
  actions, MainBreadcrumbsActions,
  mutations, MainBreadcrumbsMutations,
  getters, MainBreadcrumbsGetters
}
