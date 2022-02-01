import { Module } from 'vuex'
import { RootState } from '../index'
import { state, AppEmailTemplatesState } from './state'
import { AppEmailTemplateGetters, getters } from './getters'
import { AppEmailTemplateMutations, mutations } from './mutations'
import { AppEmailTemplateActions, actions } from './actions'

const appEmailTemplates: Module<AppEmailTemplatesState, RootState> = {
  // namespaced: true,
  actions,
  getters,
  mutations,
  state
}

export {
  appEmailTemplates, AppEmailTemplatesState,
  mutations, AppEmailTemplateMutations,
  getters, AppEmailTemplateGetters,
  actions, AppEmailTemplateActions
}
