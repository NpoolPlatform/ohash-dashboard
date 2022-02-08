import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { ApplicationState } from './state'
import { Application } from './types'
import { AppRole } from '../user-helper/types'

type ApplicationGetters = {
  getApplication (state: ApplicationState): Application
  getAppRoles (state: ApplicationState): Array<AppRole>
}

const getters: GetterTree<ApplicationState, RootState> & ApplicationGetters = {
  getApplication: (state: ApplicationState): Application => state.Application as Application,
  getAppRoles: (state: ApplicationState): Array<AppRole> => state.AppRoles
}

export { ApplicationGetters, getters }
