import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'
import { ActionTree } from 'vuex'
import { AugmentedActionContext, RootState } from '../index'
import { MailboxMutations } from './mutations'
import { API } from './const'
import { doAction } from '../action'
import { MailboxState } from './state'
import {
  CreateAnnouncementRequest,
  CreateAnnouncementResponse,
  GetAnnouncementsRequest,
  GetAnnouncementsResponse,
  UpdateAnnouncementRequest,
  UpdateAnnouncementResponse
} from './types'

interface MailboxActions {
  [ActionTypes.CreateAnnouncement]({
    commit
  }: AugmentedActionContext<
    MailboxState,
    RootState,
    MailboxMutations<MailboxState>>,
    req: CreateAnnouncementRequest): void

  [ActionTypes.GetAnnouncements]({
    commit
  }: AugmentedActionContext<
    MailboxState,
    RootState,
    MailboxMutations<MailboxState>>,
    req: GetAnnouncementsRequest): void

  [ActionTypes.UpdateAnnouncement]({
    commit
  }: AugmentedActionContext<
    MailboxState,
    RootState,
    MailboxMutations<MailboxState>>,
    req: UpdateAnnouncementRequest): void
}

const actions: ActionTree<MailboxState, RootState> = {
  [ActionTypes.CreateAnnouncement] ({ commit }, req: CreateAnnouncementRequest) {
    doAction<CreateAnnouncementRequest, CreateAnnouncementResponse>(
      commit,
      API.CREATE_ANNOUNCEMENT,
      req,
      req.Message,
      (resp: CreateAnnouncementResponse): void => {
        commit(MutationTypes.SetAnnouncement, resp.Info)
      })
  },

  [ActionTypes.GetAnnouncements] ({ commit }, req: GetAnnouncementsRequest) {
    doAction<GetAnnouncementsRequest, GetAnnouncementsResponse>(
      commit,
      API.GET_ANNOUNCEMENTS,
      req,
      req.Message,
      (resp: GetAnnouncementsResponse): void => {
        commit(MutationTypes.SetAnnouncements, resp.Infos)
      })
  },

  [ActionTypes.UpdateAnnouncement] ({ commit }, req: UpdateAnnouncementRequest) {
    doAction<UpdateAnnouncementRequest, UpdateAnnouncementResponse>(
      commit,
      API.UPDATE_ANNOUNCEMENT,
      req,
      req.Message,
      (resp: UpdateAnnouncementResponse): void => {
        commit(MutationTypes.SetAnnouncement, resp.Info)
      })
  }
}

export {
  actions,
  MailboxActions
}
