import { Application } from './types'

interface ApplicationsState {
  Applications: Map<string, Application>
  MyAppID: string
}

function state (): ApplicationsState {
  return {
    Applications: new Map<string, Application>(),
    MyAppID: ''
  }
}

export {
  state,
  ApplicationsState
}
