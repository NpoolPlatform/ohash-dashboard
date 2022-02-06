import { AppID } from 'src/const/const'
import { UserInfo } from './types'

interface UserState {
  LoginedUser: UserInfo
  GoogleToken: Map<string, string>
  AppUserInfos: Map<string, Array<UserInfo>>
  SelectedAppID: string
}

function state (): UserState {
  return {
    LoginedUser: {},
    GoogleToken: new Map<string, string>(),
    AppUserInfos: new Map<string, Array<UserInfo>>(),
    SelectedAppID: AppID
  }
}

export { state, UserState }
