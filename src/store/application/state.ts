import { AppRole } from '../user-helper/types'
import { App, Application } from './types'

interface ApplicationState {
  Application?: Application
  Apps?: App
  AppRoles: Array<AppRole>
}

function state (): ApplicationState {
  return {
    AppRoles: [] as Array<AppRole>
  }
}

export {
  state,
  ApplicationState
}
