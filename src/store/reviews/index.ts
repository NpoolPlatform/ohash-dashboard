import { Module } from 'vuex'
import { RootState } from '../index'
import { state, ReviewsState } from './state'
import { ReviewGetters, getters } from './getters'
import { ReviewMutations, mutations } from './mutations'
import { ReviewActions, actions } from './actions'

const reviews: Module<ReviewsState, RootState> = {
  // namespaced: true,
  actions,
  getters,
  mutations,
  state
}

export {
  reviews, ReviewsState,
  mutations, ReviewMutations,
  getters, ReviewGetters,
  actions, ReviewActions
}
