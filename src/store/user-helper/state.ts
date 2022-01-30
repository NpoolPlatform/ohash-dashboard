import { UserInfo } from './types'

interface UserState {
  LoginedUser: UserInfo
  GoogleToken: string
}

function state (): UserState {
  return {
    LoginedUser: {},
    GoogleToken: ''
  }
}

export { state, UserState }
