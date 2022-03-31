import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'
import {
  AddLanguageRequest,
  AddLanguageResponse,
  CreateAppLanguageRequest,
  CreateAppLanguageResponse,
  CreateMessageRequest,
  CreateMessageResponse,
  GetAppLangInfosRequest,
  GetAppLangInfosResponse,
  GetLanguagesRequest,
  GetLanguagesResponse,
  GetMessagesByLangRequest,
  GetMessagesByLangResponse,
  UpdateMessageRequest,
  UpdateMessageResponse
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

  [ActionTypes.CreateAppLanguage]({
    commit
  }: AugmentedActionContext<
    LanguagesState,
    RootState,
    LanguageMutations<LanguagesState>>,
    req: CreateAppLanguageRequest): void

  [ActionTypes.GetMessagesByLang]({
    commit
  }: AugmentedActionContext<
    LanguagesState,
    RootState,
    LanguageMutations<LanguagesState>>,
    req: GetMessagesByLangRequest): void

  [ActionTypes.CreateMessage]({
    commit
  }: AugmentedActionContext<
    LanguagesState,
    RootState,
    LanguageMutations<LanguagesState>>,
    req: CreateMessageRequest): void

  [ActionTypes.UpdateMessage]({
    commit
  }: AugmentedActionContext<
    LanguagesState,
    RootState,
    LanguageMutations<LanguagesState>>,
    req: UpdateMessageRequest): void
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
      API.GET_APP_LANG_INFOS,
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
  },

  [ActionTypes.GetMessagesByLang] ({ commit }, req: GetMessagesByLangRequest) {
    doAction<GetMessagesByLangRequest, GetMessagesByLangResponse>(
      commit,
      API.GET_MESSAGES_BY_LANG,
      req,
      req.Message,
      (resp: GetMessagesByLangResponse): void => {
        commit(MutationTypes.SetLangMessages, resp.Infos)
      })
  },

  [ActionTypes.CreateMessage] ({ commit }, req: CreateMessageRequest) {
    doAction<CreateMessageRequest, CreateMessageResponse>(
      commit,
      API.CREATE_MESSAGE,
      req,
      req.Message,
      (resp: CreateMessageResponse): void => {
        commit(MutationTypes.SetLangMessage, resp.Info)
      })
  },

  [ActionTypes.UpdateMessage] ({ commit }, req: UpdateMessageRequest) {
    doAction<UpdateMessageRequest, UpdateMessageResponse>(
      commit,
      API.UPDATE_MESSAGE,
      req,
      req.Message,
      (resp: UpdateMessageResponse): void => {
        commit(MutationTypes.SetLangMessage, resp.Info)
      })
  }
}

export {
  actions,
  LanguageActions
}
