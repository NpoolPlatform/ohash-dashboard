import { Module } from 'vuex'
import { RootState } from '../index'
import { state, BillingsState } from './state'
import { BillingGetters, getters } from './getters'
import { BillingMutations, mutations } from './mutations'
import { BillingActions, actions } from './actions'

const billings: Module<BillingsState, RootState> = {
  // namespaced: true,
  actions,
  getters,
  mutations,
  state
}

export {
  billings, BillingsState,
  mutations, BillingMutations,
  getters, BillingGetters,
  actions, BillingActions
}
