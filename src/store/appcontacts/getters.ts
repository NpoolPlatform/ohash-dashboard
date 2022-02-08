import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { AppContactsState } from './state'
import { AppContact } from './types'

type AppContactGetters = {
  getAppContacts (state: AppContactsState): Array<AppContact>
}

const getters: GetterTree<AppContactsState, RootState> & AppContactGetters = {
  getAppContacts: (state: AppContactsState): Array<AppContact> => state.AppContacts
}

export { AppContactGetters, getters }
