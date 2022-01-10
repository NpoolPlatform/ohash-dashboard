import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { ApplicationsState } from './state'
import { Application } from './types'

type ApplicationMutations<S = ApplicationsState> = {
  [MutationTypes.SetApplications] (state: S, payload: Array<Application>): void
}

const mutations: MutationTree<ApplicationsState> & ApplicationMutations = {
  [MutationTypes.SetApplications] (state: ApplicationsState, payload: Array<Application>) {
    payload.forEach((app) => {
      state.Applications.set(app.ID, app)
    })
  }
}

export { ApplicationMutations, mutations }
