import { App, Application } from './types'

interface ApplicationsState {
  Applications: Map<string, Application>
  Apps: Map<string, App>
}

function state (): ApplicationsState {
  return {
    Applications: new Map<string, Application>(),
    Apps: new Map<string, App>()
  }
}

export {
  state,
  ApplicationsState
}
