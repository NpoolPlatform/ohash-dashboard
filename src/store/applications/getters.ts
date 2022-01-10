import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { ApplicationsState } from './state'
import { Application } from './types'
import { AppID } from 'src/const/const'

type ApplicationGetters = {
  getApplication (state: ApplicationsState): Application
  getApplicationByID (state: ApplicationsState): (id: string) => Application
  getApplications (state: ApplicationsState): Array<Application>
}

const getters: GetterTree<ApplicationsState, RootState> & ApplicationGetters = {
  getApplication: (state: ApplicationsState): Application => {
    return state.Applications.get(AppID) as Application
  },
  getApplicationByID: (state: ApplicationsState): (id: string) => Application => {
    return (id: string) => state.Applications.get(id) as Application
  },
  getApplications: (state: ApplicationsState): Array<Application> => {
    const applications: Array<Application> = []
    state.Applications.forEach((val) => {
      applications.push(val)
    })
    return applications
  }
}

export { ApplicationGetters, getters }
