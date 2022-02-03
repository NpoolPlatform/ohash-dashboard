import { UserInfo } from './types'

interface UserState {
  LoginedUser: UserInfo
  GoogleToken: Map<string, string>
}

function state (): UserState {
  return {
    LoginedUser: {},
    GoogleToken: new Map<string, string>()
  }
}

export { state, UserState }
