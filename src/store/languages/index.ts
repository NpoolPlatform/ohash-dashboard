import { Module } from 'vuex'
import { RootState } from '../index'
import { state, LanguagesState } from './state'
import { LanguageGetters, getters } from './getters'
import { LanguageMutations, mutations } from './mutations'

const mainBreadcrumbs: Module<LanguagesState, RootState> = {
  // namespaced: true,
  getters,
  mutations,
  state
}

export {
  mainBreadcrumbs, LanguagesState,
  mutations, LanguageMutations,
  getters, LanguageGetters
}
