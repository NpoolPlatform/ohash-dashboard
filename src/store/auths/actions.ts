import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'
import { AuthsState } from './state'
import { ActionTree } from 'vuex'
import { AugmentedActionContext, RootState } from '../index'
import { AuthMutations } from './mutations'
import { API } from './const'
import { doAction } from '../action'
import { GetAuthsByOtherAppRequest, GetAuthsByOtherAppResponse } from './types'

interface AuthActions {
  [ActionTypes.GetAuthsByOtherApp]({
    commit
  }: AugmentedActionContext<
  AuthsState,
    RootState,
    AuthMutations<AuthsState>>,
    req: GetAuthsByOtherAppRequest): void
}

const actions: ActionTree<AuthsState, RootState> = {
  [ActionTypes.GetAuthsByOtherApp] ({ commit }, req: GetAuthsByOtherAppRequest) {
    doAction<GetAuthsByOtherAppRequest, GetAuthsByOtherAppResponse>(
      commit,
      API.GET_AUTHS_BY_OTHER_APP,
      req,
      req.Message,
      (resp: GetAuthsByOtherAppResponse): void => {
        commit(MutationTypes.SetAuthsByApp, resp.Infos)
      })
  }
}

export {
  actions,
  AuthActions
}
