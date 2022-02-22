import { Module } from 'vuex'
import { RootState } from '../index'
import { state, InspiresState } from './state'
import { InspireGetters, getters } from './getters'
import { InspireMutations, mutations } from './mutations'
import { InspireActions, actions } from './actions'

const inspire: Module<InspiresState, RootState> = {
  // namespaced: true,
  actions,
  getters,
  mutations,
  state
}

export {
  inspire, InspiresState,
  mutations, InspireMutations,
  getters, InspireGetters,
  actions, InspireActions
}
