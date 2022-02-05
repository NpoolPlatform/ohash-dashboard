import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { AppContactsState } from './state'
import { AppContact } from './types'

type AppContactGetters = {
  getAppContactsByApp (state: AppContactsState): (appID: string) => Array<AppContact>
  getAppContactSelectedAppID (state: AppContactsState): string
}

const getters: GetterTree<AppContactsState, RootState> & AppContactGetters = {
  getAppContactsByApp: (state: AppContactsState): (appID: string) => Array<AppContact> => {
    return (appID: string) => {
      return state.AppContacts.get(appID) as Array<AppContact>
    }
  },
  getAppContactSelectedAppID: (state: AppContactsState): string => state.SelectedAppID as string
}

export { AppContactGetters, getters }
