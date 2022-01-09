import { UserInfo } from './types'

interface UserState {
  LoginedUser: UserInfo
  GoogleToken: string
}

function state (): UserState {
  return {
    LoginedUser: {
      UserID: '',
      Username: '',
      EmailAddress: '',
      Avatar: '',
      PhoneNO: '',
      MyInfo: {}
    },
    GoogleToken: ''
  }
}

export { state, UserState }
