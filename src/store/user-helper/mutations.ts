import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { UserState, state as emptyState } from './state'
import { AppRoleUser, GoogleToken, UserInfo } from './types'

type UserMutations<S = UserState> = {
  [MutationTypes.SetLoginedUser] (state: S, payload: UserInfo): void
  [MutationTypes.SetGoogleToken] (state: S, payload: GoogleToken): void
  [MutationTypes.SetAppUserInfos] (state: S, payload: Array<UserInfo>): void
  [MutationTypes.SetAppRoleUsers] (state: S, payload: Array<AppRoleUser>): void
  [MutationTypes.DeleteAppRoleUser] (state: S, payload: AppRoleUser): void
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
    state.AppUserInfos = payload
  },
  [MutationTypes.SetAppRoleUsers] (state: UserState, payload: Array<AppRoleUser>): void {
    state.AppRoleUsers = payload
  },
  [MutationTypes.DeleteAppRoleUser] (state: UserState, payload: AppRoleUser): void {
    const users = state.AppRoleUsers.filter((user) => {
      return user.ID !== payload.ID
    })
    state.AppRoleUsers = users
  },
  [MutationTypes.Reset] (state: UserState) {
    Object.assign(state, { ...emptyState })
  }
}

export { UserMutations, mutations }
