import { Module } from 'vuex'
import { RootState } from '../index'
import { state, AuthsState } from './state'
import { AuthGetters, getters } from './getters'
import { AuthMutations, mutations } from './mutations'
import { AuthActions, actions } from './actions'

const auths: Module<AuthsState, RootState> = {
  // namespaced: true,
  actions,
  getters,
  mutations,
  state
}

export {
  auths, AuthsState,
  mutations, AuthMutations,
  getters, AuthGetters,
  actions, AuthActions
}
