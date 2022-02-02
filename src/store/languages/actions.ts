import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'
import {
  AddLanguageRequest,
  AddLanguageResponse,
  CreateAppLanguageRequest,
  CreateAppLanguageResponse,
  GetAppLangInfosByAppRequest,
  GetAppLangInfosByAppResponse,
  GetAppLangInfosByOtherAppRequest,
  GetAppLangInfosByOtherAppResponse,
  GetLanguagesRequest,
  GetLanguagesResponse
} from './types'
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

  [ActionTypes.GetAppLangInfosByApp]({
    commit
  }: AugmentedActionContext<
    LanguagesState,
    RootState,
    LanguageMutations<LanguagesState>>,
    req: GetAppLangInfosByAppRequest): void

  [ActionTypes.GetAppLangInfosByOtherApp]({
    commit
  }: AugmentedActionContext<
    LanguagesState,
    RootState,
    LanguageMutations<LanguagesState>>,
    req: GetAppLangInfosByOtherAppRequest): void

  [ActionTypes.AddLanguage]({
    commit
  }: AugmentedActionContext<
    LanguagesState,
    RootState,
    LanguageMutations<LanguagesState>>,
    req: AddLanguageRequest): void

  [ActionTypes.CreateAppLanguage]({
    commit
  }: AugmentedActionContext<
    LanguagesState,
    RootState,
    LanguageMutations<LanguagesState>>,
    req: CreateAppLanguageRequest): void
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

  [ActionTypes.GetAppLangInfosByApp] ({ commit }, req: GetAppLangInfosByAppRequest) {
    doAction<GetAppLangInfosByAppRequest, GetAppLangInfosByAppResponse>(
      commit,
      API.GET_APP_LANG_INFOS_BY_APP,
      req,
      req.Message,
      (resp: GetAppLangInfosByAppResponse): void => {
        commit(MutationTypes.SetAppLangInfos, resp.Infos)
      })
  },

  [ActionTypes.GetAppLangInfosByOtherApp] ({ commit }, req: GetAppLangInfosByOtherAppRequest) {
    doAction<GetAppLangInfosByOtherAppRequest, GetAppLangInfosByOtherAppResponse>(
      commit,
      API.GET_APP_LANG_INFOS_BY_OTHER_APP,
      req,
      req.Message,
      (resp: GetAppLangInfosByOtherAppResponse): void => {
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
  },

  [ActionTypes.CreateAppLanguage] ({ commit }, req: CreateAppLanguageRequest) {
    doAction<CreateAppLanguageRequest, CreateAppLanguageResponse>(
      commit,
      API.CREATE_APP_LANGUAGE,
      req,
      req.Message,
      (resp: CreateAppLanguageResponse): void => {
        commit(MutationTypes.SetAppLanguage, resp.Info)
      })
  }
}

export {
  actions,
  LanguageActions
}
