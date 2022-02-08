import { MutationTree } from 'vuex'
import { AppRole } from '../user-helper/types'
import { MutationTypes } from './mutation-types'
import { ApplicationState } from './state'
import { App, AppControl, Application, BanApp } from './types'

type ApplicationMutations<S = ApplicationState> = {
  [MutationTypes.SetApplication] (state: S, payload: Application): void
  [MutationTypes.SetAppControl] (state: S, payload: AppControl): void
  [MutationTypes.SetAppRoles] (state: S, payload: Array<AppRole>): void
}

const mutations: MutationTree<ApplicationState> & ApplicationMutations = {
  [MutationTypes.SetApplication] (state: ApplicationState, payload: Application) {
    state.Application = payload
  },

  [MutationTypes.SetAppControl] (state: ApplicationState, payload: AppControl): void {
    state.Application = {
      App: state.Application?.App as App,
      Ctrl: payload,
      Ban: state.Application?.Ban as BanApp
    }
  },

  [MutationTypes.SetAppRoles] (state: ApplicationState, payload: Array<AppRole>): void {
    state.AppRoles = payload
  }
}

export { ApplicationMutations, mutations }
