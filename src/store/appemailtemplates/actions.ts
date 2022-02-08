import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'
import {
  CreateAppEmailTemplateRequest,
  CreateAppEmailTemplateResponse,
  GetAppEmailTemplatesRequest,
  GetAppEmailTemplatesResponse,
  UpdateAppEmailTemplateRequest,
  UpdateAppEmailTemplateResponse
} from './types'
import { AppEmailTemplatesState } from './state'
import { ActionTree } from 'vuex'
import { AugmentedActionContext, RootState } from '../index'
import { AppEmailTemplateMutations } from './mutations'
import { API } from './const'
import { doAction } from '../action'

interface AppEmailTemplateActions {
  [ActionTypes.GetAppEmailTemplates]({
    commit
  }: AugmentedActionContext<
  AppEmailTemplatesState,
    RootState,
    AppEmailTemplateMutations<AppEmailTemplatesState>>,
    req: GetAppEmailTemplatesRequest): void

  [ActionTypes.CreateAppEmailTemplate]({
    commit
  }: AugmentedActionContext<
  AppEmailTemplatesState,
    RootState,
    AppEmailTemplateMutations<AppEmailTemplatesState>>,
    req: CreateAppEmailTemplateRequest): void

  [ActionTypes.UpdateAppEmailTemplate]({
    commit
  }: AugmentedActionContext<
  AppEmailTemplatesState,
    RootState,
    AppEmailTemplateMutations<AppEmailTemplatesState>>,
    req: UpdateAppEmailTemplateRequest): void
}

const actions: ActionTree<AppEmailTemplatesState, RootState> = {
  [ActionTypes.GetAppEmailTemplates] ({ commit }, req: GetAppEmailTemplatesRequest) {
    doAction<GetAppEmailTemplatesRequest, GetAppEmailTemplatesResponse>(
      commit,
      API.GET_APP_EMAIL_TEMPALTES,
      req,
      req.Message,
      (resp: GetAppEmailTemplatesResponse): void => {
        commit(MutationTypes.SetAppEmailTemplates, resp.Infos)
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
  },

  [ActionTypes.UpdateAppEmailTemplate] ({ commit }, req: UpdateAppEmailTemplateRequest) {
    doAction<UpdateAppEmailTemplateRequest, UpdateAppEmailTemplateResponse>(
      commit,
      API.UPDATE_APP_EMAIL_TEMPLATE,
      req,
      req.Message,
      (resp: UpdateAppEmailTemplateResponse): void => {
        commit(MutationTypes.SetAppEmailTemplate, resp.Info)
      })
  }
}

export {
  actions,
  AppEmailTemplateActions
}
