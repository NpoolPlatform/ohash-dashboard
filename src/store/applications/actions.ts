import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'
import { CreateAppControlRequest, CreateAppControlResponse, CreateApplicationRequest, CreateApplicationResponse, GetApplicationsRequest, GetApplicationsResponse, UpdateAppControlRequest, UpdateAppControlResponse, UpdateApplicationRequest, UpdateApplicationResponse } from './types'
import { ApplicationsState } from './state'
import { ActionTree } from 'vuex'
import { AugmentedActionContext, RootState } from '../index'
import { ApplicationMutations } from './mutations'
import { API } from './const'
import { doAction } from '../action'

interface ApplicationActions {
  [ActionTypes.GetApplications]({
    commit
  }: AugmentedActionContext<
    ApplicationsState,
    RootState,
    ApplicationMutations<ApplicationsState>>,
    req: GetApplicationsRequest): void

  [ActionTypes.CreateApplication]({
    commit
  }: AugmentedActionContext<
    ApplicationsState,
    RootState,
    ApplicationMutations<ApplicationsState>>,
    req: CreateApplicationRequest): void

  [ActionTypes.UpdateApplication]({
    commit
  }: AugmentedActionContext<
    ApplicationsState,
    RootState,
    ApplicationMutations<ApplicationsState>>,
    req: UpdateApplicationRequest): void

  [ActionTypes.CreateAppControl]({
    commit
  }: AugmentedActionContext<
    ApplicationsState,
    RootState,
    ApplicationMutations<ApplicationsState>>,
    req: CreateAppControlRequest): void

    [ActionTypes.UpdateAppControl]({
      commit
    }: AugmentedActionContext<
      ApplicationsState,
      RootState,
      ApplicationMutations<ApplicationsState>>,
      req: UpdateAppControlRequest): void
}

const actions: ActionTree<ApplicationsState, RootState> = {
  [ActionTypes.GetApplications] ({ commit }, req: GetApplicationsRequest) {
    doAction<GetApplicationsRequest, GetApplicationsResponse>(
      commit,
      API.GET_APPLICATIONS,
      req,
      req.Message,
      (resp: GetApplicationsResponse): void => {
        commit(MutationTypes.SetApplications, resp.Infos)
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
  }
}

export {
  actions,
  ApplicationActions
}
