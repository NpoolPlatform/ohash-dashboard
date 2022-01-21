import { Module } from 'vuex'
import { RootState } from '../index'
import { state, APIsState } from './state'
import { APIGetters, getters } from './getters'
import { APIMutations, mutations } from './mutations'
import { APIActions, actions } from './actions'

const apis: Module<APIsState, RootState> = {
  // namespaced: true,
  actions,
  getters,
  mutations,
  state
}

export {
  apis, APIsState,
  mutations, APIMutations,
  getters, APIGetters,
  actions, APIActions
}
