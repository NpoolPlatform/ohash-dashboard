import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'
import {
  GetKYCReviewsRequest,
  GetKYCReviewsResponse,
  UpdateReviewRequest,
  UpdateReviewResponse,
  GetWithdrawAddressReviewsRequest,
  GetWithdrawAddressReviewsResponse,
  GetWithdrawReviewsRequest,
  GetWithdrawReviewsResponse,
  UpdateUserWithdrawReviewRequest,
  UpdateUserWithdrawReviewResponse
} from './types'
import { ReviewsState } from './state'
import { ActionTree } from 'vuex'
import { AugmentedActionContext, RootState } from '../index'
import { ReviewMutations } from './mutations'
import { API } from './const'
import { doAction } from '../action'

interface ReviewActions {
  [ActionTypes.GetKYCReviews]({
    commit
  }: AugmentedActionContext<
  ReviewsState,
    RootState,
    ReviewMutations<ReviewsState>>,
    req: GetKYCReviewsRequest): void

  [ActionTypes.UpdateReview]({
    commit
  }: AugmentedActionContext<
  ReviewsState,
    RootState,
    ReviewMutations<ReviewsState>>,
    req: UpdateReviewRequest): void

  [ActionTypes.GetWithdrawAddressReviews]({
    commit
  }: AugmentedActionContext<
  ReviewsState,
    RootState,
    ReviewMutations<ReviewsState>>,
    req: GetWithdrawAddressReviewsRequest): void

  [ActionTypes.GetWithdrawReviews]({
    commit
  }: AugmentedActionContext<
  ReviewsState,
    RootState,
    ReviewMutations<ReviewsState>>,
    req: GetWithdrawReviewsRequest): void

  [ActionTypes.UpdateUserWithdrawReview]({
    commit
  }: AugmentedActionContext<
  ReviewsState,
    RootState,
    ReviewMutations<ReviewsState>>,
    req: UpdateUserWithdrawReviewRequest): void
}

const actions: ActionTree<ReviewsState, RootState> = {
  [ActionTypes.GetKYCReviews] ({ commit }, req: GetKYCReviewsRequest) {
    doAction<GetKYCReviewsRequest, GetKYCReviewsResponse>(
      commit,
      API.GET_KYC_REVIEWS,
      req,
      req.Message,
      (resp: GetKYCReviewsResponse): void => {
        commit(MutationTypes.SetKYCReviews, resp.Infos)
      })
  },

  [ActionTypes.UpdateReview] ({ commit }, req: UpdateReviewRequest) {
    doAction<UpdateReviewRequest, UpdateReviewResponse>(
      commit,
      API.UPDATE_REVIEW,
      req,
      req.Message,
      (resp: UpdateReviewResponse): void => {
        commit(MutationTypes.UpdateReview, resp.Info)
      })
  },

  [ActionTypes.GetWithdrawAddressReviews] ({ commit }, req: GetWithdrawAddressReviewsRequest) {
    doAction<GetWithdrawAddressReviewsRequest, GetWithdrawAddressReviewsResponse>(
      commit,
      API.GET_WITHDRAW_ADDRESS_REVIEWS,
      req,
      req.Message,
      (resp: GetWithdrawAddressReviewsResponse): void => {
        commit(MutationTypes.SetWithdrawAddressReviews, resp.Infos)
      })
  },

  [ActionTypes.GetWithdrawReviews] ({ commit }, req: GetWithdrawReviewsRequest) {
    doAction<GetWithdrawReviewsRequest, GetWithdrawReviewsResponse>(
      commit,
      API.GET_WITHDRAW_REVIEWS,
      req,
      req.Message,
      (resp: GetWithdrawReviewsResponse): void => {
        commit(MutationTypes.SetWithdrawReviews, resp.Infos)
      })
  },

  [ActionTypes.UpdateUserWithdrawReview] ({ commit }, req: UpdateUserWithdrawReviewRequest) {
    doAction<UpdateUserWithdrawReviewRequest, UpdateUserWithdrawReviewResponse>(
      commit,
      API.UPDATE_USER_WITHDRAW_REVIEW,
      req,
      req.Message,
      (resp: UpdateUserWithdrawReviewResponse): void => {
        commit(MutationTypes.SetWithdrawReviews, [resp.Info])
      })
  }
}

export {
  actions,
  ReviewActions
}
