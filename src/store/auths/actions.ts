import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'
import { AuthsState } from './state'
import { ActionTree } from 'vuex'
import { AugmentedActionContext, RootState } from '../index'
import { AuthMutations } from './mutations'
import { API } from './const'
import { doAction } from '../action'
import {
  GetAuthsRequest,
  GetAuthsResponse
} from './types'

interface AuthActions {
  [ActionTypes.GetAuths]({
    commit
  }: AugmentedActionContext<
    AuthsState,
    RootState,
    AuthMutations<AuthsState>>,
    req: GetAuthsRequest): void
}

const actions: ActionTree<AuthsState, RootState> = {
  [ActionTypes.GetAuths] ({ commit }, req: GetAuthsRequest) {
    doAction<GetAuthsRequest, GetAuthsResponse>(
      commit,
      API.GET_AUTHS,
      req,
      req.Message,
      (resp: GetAuthsResponse): void => {
        commit(MutationTypes.SetAuths, resp.Infos)
      })
  }
}

export {
  actions,
  AuthActions
}
