import { UserInfo } from './types'

interface UserState {
  Info: UserInfo
  GoogleToken: string
}

function state (): UserState {
  return {
    Info: {
      UserID: '',
      Username: ''
    },
    GoogleToken: ''
  }
}

export { state, UserState }
