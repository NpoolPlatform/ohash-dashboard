import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'
import { GetAppEmailTemplatesByAppRequest, GetAppEmailTemplatesByAppResponse } from './types'
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
  }
}

export {
  actions,
  AppEmailTemplateActions
}
