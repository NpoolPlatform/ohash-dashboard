import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { ReviewsState } from './state'
import { GoodReview, KYCReview, Review } from './types'

type ReviewMutations<S = ReviewsState> = {
  [MutationTypes.SetKYCReviews] (state: S, payload: Array<KYCReview>): void
  [MutationTypes.SetKYCSelectedAppID] (state: S, payload: string): void
  [MutationTypes.SetGoodReviews] (state: S, payload: Array<GoodReview>): void
  [MutationTypes.UpdateReview] (state: S, payload: Review): void
}

const mutations: MutationTree<ReviewsState> & ReviewMutations = {
  [MutationTypes.SetKYCReviews] (state: ReviewsState, payload: Array<KYCReview>) {
    state.KYCReviews = payload
  },
  [MutationTypes.SetKYCSelectedAppID] (state: ReviewsState, payload: string): void {
    state.SelectedKYCAppID = payload
  },
  [MutationTypes.SetGoodReviews] (state: ReviewsState, payload: Array<GoodReview>): void {
    state.GoodReviews = payload
  },
  [MutationTypes.UpdateReview] (state: ReviewsState, payload: Review): void {
    state.GoodReviews.forEach((review) => {
      if (review.Review.ID === payload.ID) {
        review.Review = payload
      }
    })
    state.KYCReviews.forEach((review) => {
      if (review.Review.ID === payload.ID) {
        review.Review = payload
      }
    })
  }
}

export { ReviewMutations, mutations }
