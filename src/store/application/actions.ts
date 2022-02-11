import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'
import {
  CreateAppControlRequest,
  CreateAppControlResponse,
  CreateApplicationRequest,
  CreateApplicationResponse,
  CreateAppRoleRequest,
  CreateAppRoleResponse,
  GetApplicationRequest,
  GetApplicationResponse,
  GetAppRolesRequest,
  GetAppRolesResponse,
  UpdateAppControlRequest,
  UpdateAppControlResponse,
  UpdateApplicationRequest,
  UpdateApplicationResponse,
  UpdateAppRoleRequest,
  UpdateAppRoleResponse
} from './types'
import { ApplicationState } from './state'
import { ActionTree } from 'vuex'
import { AugmentedActionContext, RootState } from '../index'
import { ApplicationMutations } from './mutations'
import { API } from './const'
import { doAction } from '../action'

interface ApplicationActions {
  [ActionTypes.GetApplication]({
    commit
  }: AugmentedActionContext<
    ApplicationState,
    RootState,
    ApplicationMutations<ApplicationState>>,
    req: GetApplicationRequest): void

  [ActionTypes.CreateApplication]({
    commit
  }: AugmentedActionContext<
    ApplicationState,
    RootState,
    ApplicationMutations<ApplicationState>>,
    req: CreateApplicationRequest): void

  [ActionTypes.UpdateApplication]({
    commit
  }: AugmentedActionContext<
    ApplicationState,
    RootState,
    ApplicationMutations<ApplicationState>>,
    req: UpdateApplicationRequest): void

  [ActionTypes.CreateAppControl]({
    commit
  }: AugmentedActionContext<
    ApplicationState,
    RootState,
    ApplicationMutations<ApplicationState>>,
    req: CreateAppControlRequest): void

  [ActionTypes.UpdateAppControl]({
    commit
  }: AugmentedActionContext<
    ApplicationState,
    RootState,
    ApplicationMutations<ApplicationState>>,
    req: UpdateAppControlRequest): void

  [ActionTypes.GetAppRoles]({
    commit
  }: AugmentedActionContext<
    ApplicationState,
    RootState,
    ApplicationMutations<ApplicationState>>,
    req: GetAppRolesRequest): void

  [ActionTypes.CreateAppRole]({
    commit
  }: AugmentedActionContext<
    ApplicationState,
    RootState,
    ApplicationMutations<ApplicationState>>,
    req: CreateAppRoleRequest): void

  [ActionTypes.UpdateAppRole]({
    commit
  }: AugmentedActionContext<
    ApplicationState,
    RootState,
    ApplicationMutations<ApplicationState>>,
    req: UpdateAppRoleRequest): void
}

const actions: ActionTree<ApplicationState, RootState> = {
  [ActionTypes.GetApplication] ({ commit }, req: GetApplicationRequest) {
    doAction<GetApplicationRequest, GetApplicationResponse>(
      commit,
      API.GET_APPLICATION,
      req,
      req.Message,
      (resp: GetApplicationResponse): void => {
        commit(MutationTypes.SetApplication, resp.Info)
      })
  },

  [ActionTypes.CreateApplication] ({ commit }, req: CreateApplicationRequest) {
    doAction<CreateApplicationRequest, CreateApplicationResponse>(
      commit,
      API.CREATE_APPLICATION,
      req,
      req.Message,
      (resp: CreateApplicationResponse): void => {
        commit(MutationTypes.SetApplication, resp.Info)
      })
  },

  [ActionTypes.UpdateApplication] ({ commit }, req: UpdateApplicationRequest) {
    doAction<UpdateApplicationRequest, UpdateApplicationResponse>(
      commit,
      API.UPDATE_APPLICATION,
      req,
      req.Message,
      (resp: UpdateApplicationResponse): void => {
        commit(MutationTypes.SetApplication, resp.Info)
      })
  },

  [ActionTypes.UpdateAppControl] ({ commit }, req: UpdateAppControlRequest) {
    doAction<UpdateAppControlRequest, UpdateAppControlResponse>(
      commit,
      API.UPDATE_APP_CONTROL,
      req,
      req.Message,
      (resp: UpdateAppControlResponse): void => {
        commit(MutationTypes.SetAppControl, resp.Info)
      })
  },

  [ActionTypes.CreateAppControl] ({ commit }, req: CreateAppControlRequest) {
    doAction<CreateAppControlRequest, CreateAppControlResponse>(
      commit,
      API.CREATE_APP_CONTROL,
      req,
      req.Message,
      (resp: CreateAppControlResponse): void => {
        commit(MutationTypes.SetAppControl, resp.Info)
      })
  },

  [ActionTypes.GetAppRoles] ({ commit }, req: GetAppRolesRequest) {
    doAction<GetAppRolesRequest, GetAppRolesResponse>(
      commit,
      API.GET_APP_ROLES,
      req,
      req.Message,
      (resp: GetAppRolesResponse): void => {
        commit(MutationTypes.SetAppRoles, resp.Infos)
      })
  },

  [ActionTypes.CreateAppRole] ({ commit }, req: CreateAppRoleRequest) {
    doAction<CreateAppRoleRequest, CreateAppRoleResponse>(
      commit,
      API.CREATE_APP_ROLE,
      req,
      req.Message,
      (resp: CreateAppRoleResponse): void => {
        commit(MutationTypes.SetAppRole, resp.Info)
      })
  },

  [ActionTypes.UpdateAppRole] ({ commit }, req: UpdateAppRoleRequest) {
    doAction<UpdateAppRoleRequest, UpdateAppRoleResponse>(
      commit,
      API.UPDATE_APP_ROLE,
      req,
      req.Message,
      (resp: UpdateAppRoleResponse): void => {
        commit(MutationTypes.SetAppRole, resp.Info)
      })
  }
}

export {
  actions,
  ApplicationActions
}
