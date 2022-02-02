import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'
import { CreateApplicationRequest, CreateApplicationResponse, GetApplicationsRequest, GetApplicationsResponse } from './types'
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
  }
}

export {
  actions,
  ApplicationActions
}
