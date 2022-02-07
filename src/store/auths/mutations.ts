import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { AuthsState } from './state'
import { Auth } from './types'

type AuthMutations<S = AuthsState> = {
  [MutationTypes.SetAuthsByApp] (state: S, payload: Array<Auth>): void
  [MutationTypes.SetSelectedAppID] (state: S, payload: string): void
}

const mutations: MutationTree<AuthsState> & AuthMutations = {
  [MutationTypes.SetAuthsByApp] (state: AuthsState, payload: Array<Auth>) {
    if (payload.length > 0) {
      state.AppAuths.set(payload[0].AppID, payload)
    }
  },
  [MutationTypes.SetSelectedAppID] (state: AuthsState, payload: string): void {
    state.SelectedAppID = payload
  }
}

export { AuthMutations, mutations }
