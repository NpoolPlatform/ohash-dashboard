import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'
import {
  GetKYCReviewsRequest,
  GetKYCReviewsResponse,
  GetGoodReviewsRequest,
  GetGoodReviewsResponse
} from './types'
import { KYCsState } from './state'
import { ActionTree } from 'vuex'
import { AugmentedActionContext, RootState } from '../index'
import { KYCMutations } from './mutations'
import { notificationPush, notificationPop } from '../notifications/helper'
import { MutationTypes as NotificationMutationTypes } from '../notifications/mutation-types'
import { Notification } from '../notifications/types'
import { api } from 'src/boot/axios'
import { API } from './const'
import { AxiosResponse } from 'axios'

interface KYCActions {
  [ActionTypes.GetKYCReviews]({
    commit
  }: AugmentedActionContext<
    KYCsState,
    RootState,
    KYCMutations<KYCsState>>,
    req: GetKYCReviewsRequest): void

  [ActionTypes.GetGoodReviews]({
    commit
  }: AugmentedActionContext<
    KYCsState,
    RootState,
    KYCMutations<KYCsState>>,
    req: GetGoodReviewsRequest): void
}

const actions: ActionTree<KYCsState, RootState> = {
  [ActionTypes.GetKYCReviews] ({ commit }, req: GetKYCReviewsRequest) {
    let waitingNotification: Notification
    if (req.Message.Waiting) {
      waitingNotification = notificationPush(req.Message.ModuleKey, req.Message.Waiting)
      commit(NotificationMutationTypes.Push, waitingNotification)
    }
    api
      .post<GetKYCReviewsRequest, AxiosResponse<GetKYCReviewsResponse>>(API.GET_KYC_REVIEWS, req)
      .then((response: AxiosResponse<GetKYCReviewsResponse>) => {
        commit(MutationTypes.SetKYCReviews, response.data.Infos)
        if (waitingNotification) {
          commit(NotificationMutationTypes.Pop, notificationPop(waitingNotification))
        }
      })
      .catch((err: Error) => {
        const error = req.Message.Error
        if (error) {
          error.Description = err.message
          const errorNotification = notificationPush(req.Message.ModuleKey, error)
          commit(NotificationMutationTypes.Push, errorNotification)
        }
      })
  },

  [ActionTypes.GetGoodReviews] ({ commit }, req: GetGoodReviewsRequest) {
    let waitingNotification: Notification
    if (req.Message.Waiting) {
      waitingNotification = notificationPush(req.Message.ModuleKey, req.Message.Waiting)
      commit(NotificationMutationTypes.Push, waitingNotification)
    }
    api
      .post<GetGoodReviewsRequest, AxiosResponse<GetGoodReviewsResponse>>(API.GET_GOOD_REVIEWS, req)
      .then((response: AxiosResponse<GetGoodReviewsResponse>) => {
        commit(MutationTypes.SetKYCReviews, response.data.Infos)
        if (waitingNotification) {
          commit(NotificationMutationTypes.Pop, notificationPop(waitingNotification))
        }
      })
      .catch((err: Error) => {
        const error = req.Message.Error
        if (error) {
          error.Description = err.message
          const errorNotification = notificationPush(req.Message.ModuleKey, error)
          commit(NotificationMutationTypes.Push, errorNotification)
        }
      })
  }
}

export {
  actions,
  KYCActions
}
