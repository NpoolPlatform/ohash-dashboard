import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { MainBreadcrumbsState } from './state'
import { MainBreadcrumbs } from './types'

type MainBreadcrumbsGetters = {
  getMainBreadcrumbs (state: MainBreadcrumbsState): Array<MainBreadcrumbs>
  getActiveBreadcrumbs (state: MainBreadcrumbsState): MainBreadcrumbs
}

const getters: GetterTree<MainBreadcrumbsState, RootState> & MainBreadcrumbsGetters = {
  getMainBreadcrumbs: (state: MainBreadcrumbsState): Array<MainBreadcrumbs> => state.Infos,
  getActiveBreadcrumbs: (state: MainBreadcrumbsState): MainBreadcrumbs => state.Active
}

export { MainBreadcrumbsGetters, getters }
