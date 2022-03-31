import { Module } from 'vuex'
import { RootState } from '../index'
import { MailboxState, state } from './state'
import { MailboxGetters, getters } from './getters'
import { MailboxMutations, mutations } from './mutations'
import { MailboxActions, actions } from './actions'

const mailbox: Module<MailboxState, RootState> = {
  // namespaced: true,
  actions,
  getters,
  mutations,
  state
}

export {
  mailbox, MailboxState,
  mutations, MailboxMutations,
  getters, MailboxGetters,
  actions, MailboxActions
}
