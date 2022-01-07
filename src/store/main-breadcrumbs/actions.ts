import { ActionTree } from 'vuex'
import { AugmentedActionContext, RootState } from '../index'
import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'
import { MainBreadcrumbsMutations } from './mutations'
import { MainBreadcrumbsState } from './state'
import { api } from 'src/boot/axios'
import { AxiosResponse } from 'axios'
import { GetMainBreadcrumbsResponse } from './types'

// use public api
const apiUrl = 'https://jsonplaceholder.typicode.com/posts'

interface MainBreadcrumbsActions {
  [ActionTypes.GetMainBreadcrumbs]({
    commit
  }: AugmentedActionContext<
  MainBreadcrumbsState,
    RootState,
    MainBreadcrumbsMutations<MainBreadcrumbsState>
  >): void
}

const actions: ActionTree<MainBreadcrumbsState, RootState> = {
  [ActionTypes.GetMainBreadcrumbs] ({ commit }) {
    commit(MutationTypes.SetLoading, true)
    api
      .get<GetMainBreadcrumbsResponse>(apiUrl)
      .then((response: AxiosResponse<GetMainBreadcrumbsResponse>) => {
        commit(MutationTypes.SetMainBreadcrumbs, response.data)
        commit(MutationTypes.SetError, '')
        commit(MutationTypes.SetLoading, false)
      })
      .catch((err: Error) => {
        commit(MutationTypes.SetError, err.message)
        commit(MutationTypes.SetLoading, false)
      })
  }
}

export { actions, MainBreadcrumbsActions }
