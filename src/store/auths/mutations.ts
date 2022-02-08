import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { AuthsState } from './state'
import { Auth } from './types'

type AuthMutations<S = AuthsState> = {
  [MutationTypes.SetAuths] (state: S, payload: Array<Auth>): void
}

const mutations: MutationTree<AuthsState> & AuthMutations = {
  [MutationTypes.SetAuths] (state: AuthsState, payload: Array<Auth>) {
    state.AppAuths = payload
  }
}

export { AuthMutations, mutations }
