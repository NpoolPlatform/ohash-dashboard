import { Module } from 'vuex'
import { RootState } from '../index'
import { state, AppSMSTemplatesState } from './state'
import { AppSMSTemplateGetters, getters } from './getters'
import { AppSMSTemplateMutations, mutations } from './mutations'
import { AppSMSTemplateActions, actions } from './actions'

const appSMSTemplates: Module<AppSMSTemplatesState, RootState> = {
  // namespaced: true,
  actions,
  getters,
  mutations,
  state
}

export {
  appSMSTemplates, AppSMSTemplatesState,
  mutations, AppSMSTemplateMutations,
  getters, AppSMSTemplateGetters,
  actions, AppSMSTemplateActions
}
