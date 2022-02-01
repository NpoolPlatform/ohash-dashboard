import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'
import { GetAPIsRequest, GetAPIsResponse } from './types'
import { APIsState } from './state'
import { ActionTree } from 'vuex'
import { AugmentedActionContext, RootState } from '../index'
import { APIMutations } from './mutations'
import { API } from './const'
import { doAction } from '../action'

interface APIActions {
  [ActionTypes.GetAPIs]({
    commit
  }: AugmentedActionContext<
    APIsState,
    RootState,
    APIMutations<APIsState>>,
    req: GetAPIsRequest): void
}

const actions: ActionTree<APIsState, RootState> = {
  [ActionTypes.GetAPIs] ({ commit }, req: GetAPIsRequest) {
    doAction<GetAPIsRequest, GetAPIsResponse>(
      commit,
      API.GET_APIS,
      req,
      req.Message,
      (resp: GetAPIsResponse): void => {
        commit(MutationTypes.SetAPIs, resp.Infos)
      })
  }
}

export {
  actions,
  APIActions
}
