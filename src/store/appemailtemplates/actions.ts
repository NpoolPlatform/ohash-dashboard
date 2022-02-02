import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'
import {
  CreateAppEmailTemplateRequest,
  CreateAppEmailTemplateResponse,
  GetAppEmailTemplatesByAppRequest,
  GetAppEmailTemplatesByAppResponse,
  GetAppEmailTemplatesByOtherAppRequest,
  GetAppEmailTemplatesByOtherAppResponse
} from './types'
import { AppEmailTemplatesState } from './state'
import { ActionTree } from 'vuex'
import { AugmentedActionContext, RootState } from '../index'
import { AppEmailTemplateMutations } from './mutations'
import { API } from './const'
import { doAction } from '../action'

interface AppEmailTemplateActions {
  [ActionTypes.GetAppEmailTemplatesByApp]({
    commit
  }: AugmentedActionContext<
  AppEmailTemplatesState,
    RootState,
    AppEmailTemplateMutations<AppEmailTemplatesState>>,
    req: GetAppEmailTemplatesByAppRequest): void

    [ActionTypes.GetAppEmailTemplatesByOtherApp]({
      commit
    }: AugmentedActionContext<
    AppEmailTemplatesState,
      RootState,
      AppEmailTemplateMutations<AppEmailTemplatesState>>,
      req: GetAppEmailTemplatesByOtherAppRequest): void

  [ActionTypes.CreateAppEmailTemplate]({
    commit
  }: AugmentedActionContext<
  AppEmailTemplatesState,
    RootState,
    AppEmailTemplateMutations<AppEmailTemplatesState>>,
    req: CreateAppEmailTemplateRequest): void
}

const actions: ActionTree<AppEmailTemplatesState, RootState> = {
  [ActionTypes.GetAppEmailTemplatesByApp] ({ commit }, req: GetAppEmailTemplatesByAppRequest) {
    doAction<GetAppEmailTemplatesByAppRequest, GetAppEmailTemplatesByAppResponse>(
      commit,
      API.GET_APP_EMAIL_TEMPALTES_BY_APP,
      req,
      req.Message,
      (resp: GetAppEmailTemplatesByAppResponse): void => {
        commit(MutationTypes.SetAppEmailTemplatesByApp, resp.Infos)
      })
  },

  [ActionTypes.GetAppEmailTemplatesByOtherApp] ({ commit }, req: GetAppEmailTemplatesByOtherAppRequest) {
    doAction<GetAppEmailTemplatesByOtherAppRequest, GetAppEmailTemplatesByOtherAppResponse>(
      commit,
      API.GET_APP_EMAIL_TEMPALTES_BY_OTHER_APP,
      req,
      req.Message,
      (resp: GetAppEmailTemplatesByOtherAppResponse): void => {
        commit(MutationTypes.SetAppEmailTemplatesByApp, resp.Infos)
      })
  },

  [ActionTypes.CreateAppEmailTemplate] ({ commit }, req: CreateAppEmailTemplateRequest) {
    doAction<CreateAppEmailTemplateRequest, CreateAppEmailTemplateResponse>(
      commit,
      API.CREATE_APP_EMAIL_TEMPLATE,
      req,
      req.Message,
      (resp: CreateAppEmailTemplateResponse): void => {
        commit(MutationTypes.SetAppEmailTemplate, resp.Info)
      })
  }
}

export {
  actions,
  AppEmailTemplateActions
}
