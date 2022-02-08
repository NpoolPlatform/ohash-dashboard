import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'
import {
  CreateAppContactRequest,
  CreateAppContactResponse,
  GetAppContactsRequest,
  GetAppContactsResponse,
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
  [ActionTypes.GetAppContacts]({
    commit
  }: AugmentedActionContext<
  AppContactsState,
    RootState,
    AppContactMutations<AppContactsState>>,
    req: GetAppContactsRequest): void

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
  [ActionTypes.GetAppContacts] ({ commit }, req: GetAppContactsRequest) {
    doAction<GetAppContactsRequest, GetAppContactsResponse>(
      commit,
      API.GET_APP_CONTACTS,
      req,
      req.Message,
      (resp: GetAppContactsResponse): void => {
        commit(MutationTypes.SetAppContacts, resp.Infos)
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
