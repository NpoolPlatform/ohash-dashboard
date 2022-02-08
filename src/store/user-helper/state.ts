import { AppRoleUser, UserInfo } from './types'

interface UserState {
  LoginedUser: UserInfo
  GoogleToken: Map<string, string>
  AppUserInfos: Array<UserInfo>
  AppRoleUsers: Array<AppRoleUser>
}

function state (): UserState {
  return {
    LoginedUser: {},
    GoogleToken: new Map<string, string>(),
    AppUserInfos: [] as Array<UserInfo>,
    AppRoleUsers: [] as Array<AppRoleUser>
  }
}

export { state, UserState }
