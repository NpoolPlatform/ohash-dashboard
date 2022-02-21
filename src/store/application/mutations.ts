import { MutationTree } from 'vuex'
import { AppRole } from '../user-helper/types'
import { MutationTypes } from './mutation-types'
import { ApplicationState } from './state'
import { App, AppControl, AppGood, Application, AppWithdrawSetting, BanApp, Recommend } from './types'

type ApplicationMutations<S = ApplicationState> = {
  [MutationTypes.SetApplication] (state: S, payload: Application): void
  [MutationTypes.SetAppControl] (state: S, payload: AppControl): void
  [MutationTypes.SetAppRoles] (state: S, payload: Array<AppRole>): void
  [MutationTypes.SetAppRole] (state: S, payload: AppRole): void
  [MutationTypes.SetAppGoods] (state: S, payload: Array<AppGood>): void
  [MutationTypes.SetRecommends] (state: S, payload: Array<Recommend>): void
  [MutationTypes.SetAppWithdrawSettings] (state: S, payload: Array<AppWithdrawSetting>): void
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
  },

  [MutationTypes.SetAppRole] (state: ApplicationState, payload: AppRole): void {
    state.AppRoles = state.AppRoles.filter((role) => {
      return role.ID !== payload.ID
    })
    state.AppRoles.push(payload)
  },

  [MutationTypes.SetAppGoods] (state: ApplicationState, payload: Array<AppGood>): void {
    state.AppGoods = payload
  },

  [MutationTypes.SetRecommends] (state: ApplicationState, payload: Array<Recommend>): void {
    state.Recommends = payload
  },

  [MutationTypes.SetAppWithdrawSettings] (state: ApplicationState, payload: Array<AppWithdrawSetting>): void {
    state.AppWithdrawSettings = payload
  }
}

export { ApplicationMutations, mutations }
