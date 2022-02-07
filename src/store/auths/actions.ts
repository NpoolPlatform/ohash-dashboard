import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'
import { AuthsState } from './state'
import { ActionTree } from 'vuex'
import { AugmentedActionContext, RootState } from '../index'
import { AuthMutations } from './mutations'
import { API } from './const'
import { doAction } from '../action'
import {
  CreateAppAuthForOtherAppRequest,
  CreateAppAuthForOtherAppResponse,
  CreateAppRoleAuthForOtherAppRequest,
  CreateAppRoleAuthForOtherAppResponse,
  CreateAppUserAuthForOtherAppRequest,
  CreateAppUserAuthForOtherAppResponse,
  GetAuthsByOtherAppRequest,
  GetAuthsByOtherAppResponse
} from './types'

interface AuthActions {
  [ActionTypes.GetAuthsByOtherApp]({
    commit
  }: AugmentedActionContext<
  AuthsState,
    RootState,
    AuthMutations<AuthsState>>,
    req: GetAuthsByOtherAppRequest): void

  [ActionTypes.CreateAppAuthForOtherApp]({
    commit
  }: AugmentedActionContext<
  AuthsState,
    RootState,
    AuthMutations<AuthsState>>,
    req: CreateAppAuthForOtherAppRequest): void

  [ActionTypes.CreateAppUserAuthForOtherApp]({
    commit
  }: AugmentedActionContext<
  AuthsState,
    RootState,
    AuthMutations<AuthsState>>,
    req: CreateAppUserAuthForOtherAppRequest): void

  [ActionTypes.CreateAppRoleAuthForOtherApp]({
    commit
  }: AugmentedActionContext<
  AuthsState,
    RootState,
    AuthMutations<AuthsState>>,
    req: CreateAppRoleAuthForOtherAppRequest): void
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
  },

  [ActionTypes.CreateAppAuthForOtherApp] ({ commit }, req: CreateAppAuthForOtherAppRequest) {
    doAction<CreateAppAuthForOtherAppRequest, CreateAppAuthForOtherAppResponse>(
      commit,
      API.CREATE_APP_AUTH_FOR_OTHER_APP,
      req,
      req.Message,
      (resp: CreateAppAuthForOtherAppResponse): void => {
        commit(MutationTypes.SetAuthsByApp, [resp.Info])
      })
  },

  [ActionTypes.CreateAppUserAuthForOtherApp] ({ commit }, req: CreateAppUserAuthForOtherAppRequest) {
    doAction<CreateAppUserAuthForOtherAppRequest, CreateAppUserAuthForOtherAppResponse>(
      commit,
      API.CREATE_APP_USER_AUTH_FOR_OTHER_APP,
      req,
      req.Message,
      (resp: CreateAppUserAuthForOtherAppResponse): void => {
        commit(MutationTypes.SetAuthsByApp, [resp.Info])
      })
  },

  [ActionTypes.CreateAppRoleAuthForOtherApp] ({ commit }, req: CreateAppRoleAuthForOtherAppRequest) {
    doAction<CreateAppRoleAuthForOtherAppRequest, CreateAppRoleAuthForOtherAppResponse>(
      commit,
      API.CREATE_APP_ROLE_AUTH_FOR_OTHER_APP,
      req,
      req.Message,
      (resp: CreateAppRoleAuthForOtherAppResponse): void => {
        commit(MutationTypes.SetAuthsByApp, [resp.Info])
      })
  }
}

export {
  actions,
  AuthActions
}
