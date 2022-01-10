import { Module } from 'vuex'
import { RootState } from '../index'
import { state, ReviewsState } from './state'
import { ReviewGetters, getters } from './getters'
import { ReviewMutations, mutations } from './mutations'
import { ReviewActions, actions } from './actions'

const KYCs: Module<ReviewsState, RootState> = {
  // namespaced: true,
  actions,
  getters,
  mutations,
  state
}

export {
  KYCs, ReviewsState,
  mutations, ReviewMutations,
  getters, ReviewGetters,
  actions, ReviewActions
}
