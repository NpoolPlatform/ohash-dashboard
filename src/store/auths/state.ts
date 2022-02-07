import { Auth } from './types'

interface AuthsState {
  AppAuths: Map<string, Array<Auth>>
  SelectedAppID?: string
}

function state (): AuthsState {
  return {
    AppAuths: new Map<string, Array<Auth>>()
  }
}

export {
  state,
  AuthsState
}
