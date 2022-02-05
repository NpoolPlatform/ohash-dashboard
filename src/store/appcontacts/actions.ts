import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'
import {
  CreateAppContactRequest,
  CreateAppContactResponse,
  GetAppContactsByAppRequest,
  GetAppContactsByAppResponse,
  GetAppContactsByOtherAppRequest,
  GetAppContactsByOtherAppResponse,
  UpdateAppContactRequest,
  UpdateAppContactResponse
} from './types'
import { AppContactsState } from './state'
import { ActionTree } from 'vuex'
import { AugmentedActionContext, RootState } from '../index'
import { AppContactMutations } from './mutations'
import { API } from './const'
import { doAction } from '../action'

interface AppContactActions {
  [ActionTypes.GetAppContactsByApp]({
    commit
  }: AugmentedActionContext<
  AppContactsState,
    RootState,
    AppContactMutations<AppContactsState>>,
    req: GetAppContactsByAppRequest): void

    [ActionTypes.GetAppContactsByOtherApp]({
      commit
    }: AugmentedActionContext<
    AppContactsState,
      RootState,
      AppContactMutations<AppContactsState>>,
      req: GetAppContactsByOtherAppRequest): void

  [ActionTypes.CreateAppContact]({
    commit
  }: AugmentedActionContext<
  AppContactsState,
    RootState,
    AppContactMutations<AppContactsState>>,
    req: CreateAppContactRequest): void

  [ActionTypes.UpdateAppContact]({
    commit
  }: AugmentedActionContext<
  AppContactsState,
    RootState,
    AppContactMutations<AppContactsState>>,
    req: UpdateAppContactRequest): void
}

const actions: ActionTree<AppContactsState, RootState> = {
  [ActionTypes.GetAppContactsByApp] ({ commit }, req: GetAppContactsByAppRequest) {
    doAction<GetAppContactsByAppRequest, GetAppContactsByAppResponse>(
      commit,
      API.GET_APP_EMAIL_TEMPALTES_BY_APP,
      req,
      req.Message,
      (resp: GetAppContactsByAppResponse): void => {
        commit(MutationTypes.SetAppContactsByApp, resp.Infos)
      })
  },

  [ActionTypes.GetAppContactsByOtherApp] ({ commit }, req: GetAppContactsByOtherAppRequest) {
    doAction<GetAppContactsByOtherAppRequest, GetAppContactsByOtherAppResponse>(
      commit,
      API.GET_APP_EMAIL_TEMPALTES_BY_OTHER_APP,
      req,
      req.Message,
      (resp: GetAppContactsByOtherAppResponse): void => {
        commit(MutationTypes.SetAppContactsByApp, resp.Infos)
      })
  },

  [ActionTypes.CreateAppContact] ({ commit }, req: CreateAppContactRequest) {
    doAction<CreateAppContactRequest, CreateAppContactResponse>(
      commit,
      API.CREATE_APP_CONTACT,
      req,
      req.Message,
      (resp: CreateAppContactResponse): void => {
        commit(MutationTypes.SetAppContact, resp.Info)
      })
  },

  [ActionTypes.UpdateAppContact] ({ commit }, req: UpdateAppContactRequest) {
    doAction<UpdateAppContactRequest, UpdateAppContactResponse>(
      commit,
      API.UPDATE_APP_CONTACT,
      req,
      req.Message,
      (resp: UpdateAppContactResponse): void => {
        commit(MutationTypes.SetAppContact, resp.Info)
      })
  }
}

export {
  actions,
  AppContactActions
}
