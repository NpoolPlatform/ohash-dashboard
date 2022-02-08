import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'
import {
  GetKYCReviewsRequest,
  GetKYCReviewsResponse,
  UpdateReviewRequest,
  UpdateReviewResponse
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
  }
}

export {
  actions,
  ReviewActions
}
