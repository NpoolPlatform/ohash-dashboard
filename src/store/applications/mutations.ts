import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { ApplicationsState } from './state'
import { App, Application } from './types'

type ApplicationMutations<S = ApplicationsState> = {
  [MutationTypes.SetApplications] (state: S, payload: Array<Application>): void
  [MutationTypes.SetApplication] (state: S, payload: App): void
}

const mutations: MutationTree<ApplicationsState> & ApplicationMutations = {
  [MutationTypes.SetApplications] (state: ApplicationsState, payload: Array<Application>) {
    payload.forEach((app) => {
      state.Applications.set(app.App.ID, app)
    })
  },

  [MutationTypes.SetApplication] (state: ApplicationsState, payload: App) {
    state.Apps.set(payload.ID, payload)
  }
}

export { ApplicationMutations, mutations }
