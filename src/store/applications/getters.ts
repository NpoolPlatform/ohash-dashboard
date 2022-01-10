import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { ApplicationsState } from './state'
import { Application } from './types'
import { AppID } from 'src/const/const'

type ApplicationGetters = {
  getApplication (state: ApplicationsState): Application
}

const getters: GetterTree<ApplicationsState, RootState> & ApplicationGetters = {
  getApplication: (state: ApplicationsState): Application => state.Applications.get(AppID) as Application
}

export { ApplicationGetters, getters }
