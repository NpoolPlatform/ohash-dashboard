import { Application } from './types'

interface ApplicationsState {
  Applications: Map<string, Application>
}

function state (): ApplicationsState {
  return {
    Applications: new Map<string, Application>()
  }
}

export {
  state,
  ApplicationsState
}
