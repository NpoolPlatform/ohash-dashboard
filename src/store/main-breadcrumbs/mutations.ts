import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { MainBreadcrumbsState, state as emptyState } from './state'
import { MainBreadcrumbs } from './types'

type MainBreadcrumbsMutations<S = MainBreadcrumbsState> = {
  [MutationTypes.SetMainBreadcrumbs] (state: S, payload: Array<MainBreadcrumbs>): void
  [MutationTypes.SetActiveBreadcrumbs] (state: S, payload: MainBreadcrumbs): void
  [MutationTypes.Reset] (state: S): void
}

const mutations: MutationTree<MainBreadcrumbsState> & MainBreadcrumbsMutations = {
  [MutationTypes.SetMainBreadcrumbs] (state: MainBreadcrumbsState, payload: Array<MainBreadcrumbs>) {
    state.Infos = payload
  },
  [MutationTypes.SetActiveBreadcrumbs] (state: MainBreadcrumbsState, payload: MainBreadcrumbs) {
    state.Active = payload
  },
  [MutationTypes.Reset] (state: MainBreadcrumbsState) {
    Object.assign(state, { ...emptyState })
  }
}

export { MainBreadcrumbsMutations, mutations }
