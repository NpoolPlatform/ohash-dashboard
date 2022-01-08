import { UserInfo } from './types'

interface UserState {
  Info: UserInfo
  loading: boolean
  error: string
}

function state (): UserState {
  return {
    Info: {
      UserID: '',
      Username: ''
    },
    loading: false,
    error: ''
  }
}

export { state, UserState }
