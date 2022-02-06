import { AppID } from 'src/const/const'
import { AppRoleUser, UserInfo } from './types'

interface UserState {
  LoginedUser: UserInfo
  GoogleToken: Map<string, string>
  AppUserInfos: Map<string, Array<UserInfo>>
  AppRoleUsers: Map<string, Array<AppRoleUser>>
  SelectedAppID: string
}

function state (): UserState {
  return {
    LoginedUser: {},
    GoogleToken: new Map<string, string>(),
    AppUserInfos: new Map<string, Array<UserInfo>>(),
    AppRoleUsers: new Map<string, Array<AppRoleUser>>(),
    SelectedAppID: AppID
  }
}

export { state, UserState }
