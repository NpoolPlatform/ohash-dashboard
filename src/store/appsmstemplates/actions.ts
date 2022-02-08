import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'
import {
  CreateAppSMSTemplateRequest,
  CreateAppSMSTemplateResponse,
  GetAppSMSTemplatesRequest,
  GetAppSMSTemplatesResponse,
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
  [ActionTypes.GetAppSMSTemplates]({
    commit
  }: AugmentedActionContext<
  AppSMSTemplatesState,
    RootState,
    AppSMSTemplateMutations<AppSMSTemplatesState>>,
    req: GetAppSMSTemplatesRequest): void

    [ActionTypes.GetAppSMSTemplates]({
      commit
    }: AugmentedActionContext<
    AppSMSTemplatesState,
      RootState,
      AppSMSTemplateMutations<AppSMSTemplatesState>>,
      req: GetAppSMSTemplatesRequest): void

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
  [ActionTypes.GetAppSMSTemplates] ({ commit }, req: GetAppSMSTemplatesRequest) {
    doAction<GetAppSMSTemplatesRequest, GetAppSMSTemplatesResponse>(
      commit,
      API.GET_APP_SMS_TEMPALTES,
      req,
      req.Message,
      (resp: GetAppSMSTemplatesResponse): void => {
        commit(MutationTypes.SetAppSMSTemplates, resp.Infos)
      })
  },

  [ActionTypes.GetAppSMSTemplates] ({ commit }, req: GetAppSMSTemplatesRequest) {
    doAction<GetAppSMSTemplatesRequest, GetAppSMSTemplatesResponse>(
      commit,
      API.GET_APP_SMS_TEMPALTES,
      req,
      req.Message,
      (resp: GetAppSMSTemplatesResponse): void => {
        commit(MutationTypes.SetAppSMSTemplates, resp.Infos)
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
