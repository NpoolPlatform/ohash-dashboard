import { Auth } from './types'

interface AuthsState {
  AppAuths: Array<Auth>
}

function state (): AuthsState {
  return {
    AppAuths: [] as Array<Auth>
  }
}

export {
  state,
  AuthsState
}
