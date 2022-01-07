import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { MainBreadcrumbsState } from './state'
import { MainBreadcrumbs } from './types'

type MainBreadcrumbsGetters = {
  getMainBreadcrumbsInfos (state: MainBreadcrumbsState): Array<MainBreadcrumbs>
  getMainBreadcrumbsLoading (state: MainBreadcrumbsState): boolean
  getMainBreadcrumbsError (state: MainBreadcrumbsState): string
}

const getters: GetterTree<MainBreadcrumbsState, RootState> & MainBreadcrumbsGetters = {
  getMainBreadcrumbsInfos: (state: MainBreadcrumbsState): Array<MainBreadcrumbs> => state.Infos,
  getMainBreadcrumbsLoading: (state: MainBreadcrumbsState): boolean => state.loading,
  getMainBreadcrumbsError: (state: MainBreadcrumbsState): string => state.error
}

export { MainBreadcrumbsGetters, getters }
