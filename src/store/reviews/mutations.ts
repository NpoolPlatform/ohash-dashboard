import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { ReviewsState } from './state'
import { GoodReview, KYCReview } from './types'

type ReviewMutations<S = ReviewsState> = {
  [MutationTypes.SetKYCReviews] (state: S, payload: Array<KYCReview>): void
  [MutationTypes.SetKYCSelectedAppID] (state: S, payload: string): void
  [MutationTypes.SetGoodReviews] (state: S, payload: Array<GoodReview>): void
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
  }
}

export { ReviewMutations, mutations }
