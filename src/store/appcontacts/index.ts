import { Module } from 'vuex'
import { RootState } from '../index'
import { state, AppContactsState } from './state'
import { AppContactGetters, getters } from './getters'
import { AppContactMutations, mutations } from './mutations'
import { AppContactActions, actions } from './actions'

const appContacts: Module<AppContactsState, RootState> = {
  // namespaced: true,
  actions,
  getters,
  mutations,
  state
}

export {
  appContacts, AppContactsState,
  mutations, AppContactMutations,
  getters, AppContactGetters,
  actions, AppContactActions
}
