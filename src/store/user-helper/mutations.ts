import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { UserState, state as emptyState } from './state'
import { GoogleToken, UserInfo } from './types'

type UserMutations<S = UserState> = {
  [MutationTypes.SetLoginedUser] (state: S, payload: UserInfo): void
  [MutationTypes.SetGoogleToken] (state: S, payload: GoogleToken): void
  [MutationTypes.SetAppUserInfos] (state: S, payload: Array<UserInfo>): void
  [MutationTypes.SetSelectedAppID] (state: S, payload: string): void
  [MutationTypes.Reset] (state: S): void
}

const mutations: MutationTree<UserState> & UserMutations = {
  [MutationTypes.SetLoginedUser] (state: UserState, payload: UserInfo) {
    state.LoginedUser = payload
  },
  [MutationTypes.SetGoogleToken] (state: UserState, payload: GoogleToken): void {
    state.GoogleToken.set(payload.Req, payload.Token)
  },
  [MutationTypes.SetAppUserInfos] (state: UserState, payload: Array<UserInfo>): void {
    if (payload.length > 0) {
      state.AppUserInfos.set(payload[0].User?.AppID as string, payload)
    }
  },
  [MutationTypes.SetSelectedAppID] (state: UserState, payload: string): void {
    state.SelectedAppID = payload
  },
  [MutationTypes.Reset] (state: UserState) {
    Object.assign(state, { ...emptyState })
  }
}

export { UserMutations, mutations }
