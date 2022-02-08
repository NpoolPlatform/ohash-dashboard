import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { ReviewsState } from './state'
import { KYCReview, Review } from './types'

type ReviewMutations<S = ReviewsState> = {
  [MutationTypes.SetKYCReviews] (state: S, payload: Array<KYCReview>): void
  [MutationTypes.UpdateReview] (state: S, payload: Review): void
}

const mutations: MutationTree<ReviewsState> & ReviewMutations = {
  [MutationTypes.SetKYCReviews] (state: ReviewsState, payload: Array<KYCReview>) {
    state.KYCReviews = payload
  },
  [MutationTypes.UpdateReview] (state: ReviewsState, payload: Review): void {
    state.KYCReviews.forEach((review) => {
      if (review.Review.ID === payload.ID) {
        review.Review = payload
      }
    })
  }
}

export { ReviewMutations, mutations }
