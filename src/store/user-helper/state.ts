import { UserInfo } from './types'

interface UserState {
  Info: UserInfo
  GoogleToken: string
  loading: boolean
  error: string
}

function state (): UserState {
  return {
    Info: {
      UserID: '',
      Username: ''
    },
    GoogleToken: '',
    loading: false,
    error: ''
  }
}

export { state, UserState }
