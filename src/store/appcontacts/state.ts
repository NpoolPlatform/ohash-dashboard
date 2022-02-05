import { AppContact } from './types'

interface AppContactsState {
  AppContacts: Map<string, Array<AppContact>>
  SelectedAppID?: string
}

function state (): AppContactsState {
  return {
    AppContacts: new Map<string, Array<AppContact>>()
  }
}

export {
  state,
  AppContactsState
}
