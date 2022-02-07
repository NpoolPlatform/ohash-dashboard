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
      let auths = state.AppAuths.get(payload[0].AppID) as Array<Auth>
      if (!auths) {
        auths = [] as Array<Auth>
      }
      payload.forEach((auth) => {
        for (let i = 0; i < auths?.length; i++) {
          if (auths[i].ID === auth.ID) {
            return
          }
        }
        auths.push(auth)
      })
      state.AppAuths.set(payload[0].AppID, auths)
    }
  },
  [MutationTypes.SetSelectedAppID] (state: AuthsState, payload: string): void {
    state.SelectedAppID = payload
  }
}

export { AuthMutations, mutations }
