import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'
import { AddLanguageRequest, AddLanguageResponse, GetAppLangInfosRequest, GetAppLangInfosResponse, GetLanguagesRequest, GetLanguagesResponse } from './types'
import { LanguagesState } from './state'
import { ActionTree } from 'vuex'
import { AugmentedActionContext, RootState } from '../index'
import { LanguageMutations } from './mutations'
import { API } from './const'
import { doAction } from '../action'

interface LanguageActions {
  [ActionTypes.GetLanguages]({
    commit
  }: AugmentedActionContext<
    LanguagesState,
    RootState,
    LanguageMutations<LanguagesState>>,
    req: GetLanguagesRequest): void

  [ActionTypes.GetAppLangInfos]({
    commit
  }: AugmentedActionContext<
    LanguagesState,
    RootState,
    LanguageMutations<LanguagesState>>,
    req: GetAppLangInfosRequest): void

  [ActionTypes.AddLanguage]({
    commit
  }: AugmentedActionContext<
    LanguagesState,
    RootState,
    LanguageMutations<LanguagesState>>,
    req: AddLanguageRequest): void
}

const actions: ActionTree<LanguagesState, RootState> = {
  [ActionTypes.GetLanguages] ({ commit }, req: GetLanguagesRequest) {
    doAction<GetLanguagesRequest, GetLanguagesResponse>(
      commit,
      API.GET_LANGUAGES,
      req,
      req.Message,
      (resp: GetLanguagesResponse): void => {
        resp.Infos.forEach((lang) => {
          commit(MutationTypes.SetLanguage, lang)
          commit(MutationTypes.SetLangShort, lang.Short)
        })
      })
  },

  [ActionTypes.GetAppLangInfos] ({ commit }, req: GetAppLangInfosRequest) {
    doAction<GetAppLangInfosRequest, GetAppLangInfosResponse>(
      commit,
      API.GET_APP_LANG_INFOS_BY_APP,
      req,
      req.Message,
      (resp: GetAppLangInfosResponse): void => {
        commit(MutationTypes.SetAppLangInfos, resp.Infos)
      })
  },

  [ActionTypes.AddLanguage] ({ commit }, req: AddLanguageRequest) {
    doAction<AddLanguageRequest, AddLanguageResponse>(
      commit,
      API.ADD_LANGUAGE,
      req,
      req.Message,
      (resp: AddLanguageResponse): void => {
        commit(MutationTypes.SetLanguage, resp.Info)
      })
  }
}

export {
  actions,
  LanguageActions
}
