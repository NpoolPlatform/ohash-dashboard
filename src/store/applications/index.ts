import { Module } from 'vuex'
import { RootState } from '../index'
import { state, ApplicationsState } from './state'
import { ApplicationGetters, getters } from './getters'
import { ApplicationMutations, mutations } from './mutations'
import { ApplicationActions, actions } from './actions'

const applications: Module<ApplicationsState, RootState> = {
  // namespaced: true,
  actions,
  getters,
  mutations,
  state
}

export {
  applications, ApplicationsState,
  mutations, ApplicationMutations,
  getters, ApplicationGetters,
  actions, ApplicationActions
}
