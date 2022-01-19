import { Module } from 'vuex'
import { RootState } from '../index'
import { state, KYCsState } from './state'
import { KYCGetters, getters } from './getters'
import { KYCMutations, mutations } from './mutations'
import { KYCActions, actions } from './actions'

const kyc: Module<KYCsState, RootState> = {
  // namespaced: true,
  actions,
  getters,
  mutations,
  state
}

export {
  kyc, KYCsState,
  mutations, KYCMutations,
  getters, KYCGetters,
  actions, KYCActions
}
