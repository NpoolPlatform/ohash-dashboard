import { AppContact } from './types'

interface AppContactsState {
  AppContacts: Array<AppContact>
}

function state (): AppContactsState {
  return {
    AppContacts: [] as Array<AppContact>
  }
}

export {
  state,
  AppContactsState
}
