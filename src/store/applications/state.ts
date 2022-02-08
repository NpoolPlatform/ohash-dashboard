import { AppID } from 'src/const/const'
import { AppRole } from '../user-helper/types'
import { App, Application } from './types'

interface ApplicationsState {
  Applications: Map<string, Application>
  Apps: Map<string, App>
  SelectedAppID: string
  AppRoles: Map<string, Array<AppRole>>
}

function state (): ApplicationsState {
  return {
    Applications: new Map<string, Application>(),
    Apps: new Map<string, App>(),
    SelectedAppID: AppID,
    AppRoles: new Map<string, Array<AppRole>>()
  }
}

export {
  state,
  ApplicationsState
}
