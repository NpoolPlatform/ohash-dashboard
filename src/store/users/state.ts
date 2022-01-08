import { UserInfo } from './types'

interface UserState {
  Logined: boolean
  Infos: Array<UserInfo>
  loading: boolean
  error: string
}

function state (): UserState {
  return {
    Logined: false,
    Infos: [],
    loading: false,
    error: ''
  }
}

export { state, UserState }
