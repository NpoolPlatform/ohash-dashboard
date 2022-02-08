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
  DeleteAppAuthRequest,
  DeleteAppAuthResponse,
  DeleteAppRoleAuthRequest,
  DeleteAppRoleAuthResponse,
  DeleteAppUserAuthRequest,
  DeleteAppUserAuthResponse,
  GetAuthHistoriesByOtherAppRequest,
  GetAuthHistoriesByOtherAppResponse,
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

  [ActionTypes.DeleteAppAuth]({
    commit
  }: AugmentedActionContext<
    AuthsState,
    RootState,
    AuthMutations<AuthsState>>,
    req: DeleteAppAuthRequest): void

  [ActionTypes.DeleteAppUserAuth]({
    commit
  }: AugmentedActionContext<
    AuthsState,
    RootState,
    AuthMutations<AuthsState>>,
    req: DeleteAppUserAuthRequest): void

  [ActionTypes.DeleteAppRoleAuth]({
    commit
  }: AugmentedActionContext<
    AuthsState,
    RootState,
    AuthMutations<AuthsState>>,
    req: DeleteAppRoleAuthRequest): void

  [ActionTypes.GetAuthHistoriesByOtherApp]({
    commit
  }: AugmentedActionContext<
    AuthsState,
    RootState,
    AuthMutations<AuthsState>>,
    req: GetAuthHistoriesByOtherAppRequest): void
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
  },

  [ActionTypes.DeleteAppAuth] ({ commit }, req: DeleteAppAuthRequest) {
    doAction<DeleteAppAuthRequest, DeleteAppAuthResponse>(
      commit,
      API.DELETE_APP_AUTH_FOR,
      req,
      req.Message,
      (resp: DeleteAppAuthResponse): void => {
        commit(MutationTypes.DeleteAuth, resp.Info)
      })
  },

  [ActionTypes.DeleteAppUserAuth] ({ commit }, req: DeleteAppUserAuthRequest) {
    doAction<DeleteAppUserAuthRequest, DeleteAppUserAuthResponse>(
      commit,
      API.DELETE_APP_USER_AUTH_FOR,
      req,
      req.Message,
      (resp: DeleteAppUserAuthResponse): void => {
        commit(MutationTypes.DeleteAuth, resp.Info)
      })
  },

  [ActionTypes.DeleteAppRoleAuth] ({ commit }, req: DeleteAppRoleAuthRequest) {
    doAction<DeleteAppRoleAuthRequest, DeleteAppRoleAuthResponse>(
      commit,
      API.DELETE_APP_ROLE_AUTH_FOR,
      req,
      req.Message,
      (resp: DeleteAppRoleAuthResponse): void => {
        commit(MutationTypes.DeleteAuth, resp.Info)
      })
  },

  [ActionTypes.GetAuthHistoriesByOtherApp] ({ commit }, req: GetAuthHistoriesByOtherAppRequest) {
    doAction<GetAuthHistoriesByOtherAppRequest, GetAuthHistoriesByOtherAppResponse>(
      commit,
      API.GET_AUTH_HISTORIES_BY_OTHER_APP,
      req,
      req.Message,
      (resp: GetAuthHistoriesByOtherAppResponse): void => {
        commit(MutationTypes.SetAuthHistories, resp.Infos)
      })
  }
}

export {
  actions,
  AuthActions
}
