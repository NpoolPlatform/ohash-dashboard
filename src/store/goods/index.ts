import { Module } from 'vuex'
import { RootState } from '../index'
import { state, GoodsState } from './state'
import { GoodGetters, getters } from './getters'
import { GoodMutations, mutations } from './mutations'
import { GoodActions, actions } from './actions'

const goods: Module<GoodsState, RootState> = {
  // namespaced: true,
  actions,
  getters,
  mutations,
  state
}

export {
  goods, GoodsState,
  mutations, GoodMutations,
  getters, GoodGetters,
  actions, GoodActions
}
