import { Auth, AuthHistory } from './types'

interface AuthsState {
  AppAuths: Map<string, Array<Auth>>
  SelectedAppID?: string
  AuthHistories: Map<string, Array<AuthHistory>>
}

function state (): AuthsState {
  return {
    AppAuths: new Map<string, Array<Auth>>(),
    AuthHistories: new Map<string, Array<AuthHistory>>()
  }
}

export {
  state,
  AuthsState
}
