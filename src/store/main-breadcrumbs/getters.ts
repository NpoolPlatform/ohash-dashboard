import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { MainBreadcrumbsState } from './state'
import { MainBreadcrumbs } from './types'

type MainBreadcrumbsGetters = {
  getMainBreadcrumbs (state: MainBreadcrumbsState): Array<MainBreadcrumbs>
  getActiveBreadcrumbs (state: MainBreadcrumbsState): MainBreadcrumbs
  getMainBreadcrumbsLoading (state: MainBreadcrumbsState): boolean
  getMainBreadcrumbsError (state: MainBreadcrumbsState): string
}

const getters: GetterTree<MainBreadcrumbsState, RootState> & MainBreadcrumbsGetters = {
  getMainBreadcrumbs: (state: MainBreadcrumbsState): Array<MainBreadcrumbs> => state.Infos,
  getActiveBreadcrumbs: (state: MainBreadcrumbsState): MainBreadcrumbs => state.Active,
  getMainBreadcrumbsLoading: (state: MainBreadcrumbsState): boolean => state.loading,
  getMainBreadcrumbsError: (state: MainBreadcrumbsState): string => state.error
}

export { MainBreadcrumbsGetters, getters }
