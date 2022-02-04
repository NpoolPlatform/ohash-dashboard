import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'
import {
  CreateAppSMSTemplateRequest,
  CreateAppSMSTemplateResponse,
  GetAppSMSTemplatesByAppRequest,
  GetAppSMSTemplatesByAppResponse,
  GetAppSMSTemplatesByOtherAppRequest,
  GetAppSMSTemplatesByOtherAppResponse,
  UpdateAppSMSTemplateRequest,
  UpdateAppSMSTemplateResponse
} from './types'
import { AppSMSTemplatesState } from './state'
import { ActionTree } from 'vuex'
import { AugmentedActionContext, RootState } from '../index'
import { AppSMSTemplateMutations } from './mutations'
import { API } from './const'
import { doAction } from '../action'

interface AppSMSTemplateActions {
  [ActionTypes.GetAppSMSTemplatesByApp]({
    commit
  }: AugmentedActionContext<
  AppSMSTemplatesState,
    RootState,
    AppSMSTemplateMutations<AppSMSTemplatesState>>,
    req: GetAppSMSTemplatesByAppRequest): void

    [ActionTypes.GetAppSMSTemplatesByOtherApp]({
      commit
    }: AugmentedActionContext<
    AppSMSTemplatesState,
      RootState,
      AppSMSTemplateMutations<AppSMSTemplatesState>>,
      req: GetAppSMSTemplatesByOtherAppRequest): void

  [ActionTypes.CreateAppSMSTemplate]({
    commit
  }: AugmentedActionContext<
  AppSMSTemplatesState,
    RootState,
    AppSMSTemplateMutations<AppSMSTemplatesState>>,
    req: CreateAppSMSTemplateRequest): void

  [ActionTypes.UpdateAppSMSTemplate]({
    commit
  }: AugmentedActionContext<
  AppSMSTemplatesState,
    RootState,
    AppSMSTemplateMutations<AppSMSTemplatesState>>,
    req: UpdateAppSMSTemplateRequest): void
}

const actions: ActionTree<AppSMSTemplatesState, RootState> = {
  [ActionTypes.GetAppSMSTemplatesByApp] ({ commit }, req: GetAppSMSTemplatesByAppRequest) {
    doAction<GetAppSMSTemplatesByAppRequest, GetAppSMSTemplatesByAppResponse>(
      commit,
      API.GET_APP_SMS_TEMPALTES_BY_APP,
      req,
      req.Message,
      (resp: GetAppSMSTemplatesByAppResponse): void => {
        commit(MutationTypes.SetAppSMSTemplatesByApp, resp.Infos)
      })
  },

  [ActionTypes.GetAppSMSTemplatesByOtherApp] ({ commit }, req: GetAppSMSTemplatesByOtherAppRequest) {
    doAction<GetAppSMSTemplatesByOtherAppRequest, GetAppSMSTemplatesByOtherAppResponse>(
      commit,
      API.GET_APP_SMS_TEMPALTES_BY_OTHER_APP,
      req,
      req.Message,
      (resp: GetAppSMSTemplatesByOtherAppResponse): void => {
        commit(MutationTypes.SetAppSMSTemplatesByApp, resp.Infos)
      })
  },

  [ActionTypes.CreateAppSMSTemplate] ({ commit }, req: CreateAppSMSTemplateRequest) {
    doAction<CreateAppSMSTemplateRequest, CreateAppSMSTemplateResponse>(
      commit,
      API.CREATE_APP_SMS_TEMPLATE,
      req,
      req.Message,
      (resp: CreateAppSMSTemplateResponse): void => {
        commit(MutationTypes.SetAppSMSTemplate, resp.Info)
      })
  },

  [ActionTypes.UpdateAppSMSTemplate] ({ commit }, req: UpdateAppSMSTemplateRequest) {
    doAction<UpdateAppSMSTemplateRequest, UpdateAppSMSTemplateResponse>(
      commit,
      API.UPDATE_APP_SMS_TEMPLATE,
      req,
      req.Message,
      (resp: UpdateAppSMSTemplateResponse): void => {
        commit(MutationTypes.SetAppSMSTemplate, resp.Info)
      })
  }
}

export {
  actions,
  AppSMSTemplateActions
}
