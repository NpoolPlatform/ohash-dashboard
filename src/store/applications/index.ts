import { Module } from 'vuex'
import { RootState } from '../index'
import { state, ApplicationsState } from './state'
import { ApplicationGetters, getters } from './getters'
import { ApplicationMutations, mutations } from './mutations'

const applications: Module<ApplicationsState, RootState> = {
  // namespaced: true,
  getters,
  mutations,
  state
}

export {
  applications, ApplicationsState,
  mutations, ApplicationMutations,
  getters, ApplicationGetters
}
