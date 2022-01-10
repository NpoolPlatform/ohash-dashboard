import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { ReviewsState } from './state'
import { GoodReview, KYCReview } from './types'

type ReviewGetters = {
  getKYCReviews (state: ReviewsState): Array<KYCReview>
  getKYCSelectedAppID (state: ReviewsState): string
  getGoodReviews (state: ReviewsState): Array<GoodReview>
}

const getters: GetterTree<ReviewsState, RootState> & ReviewGetters = {
  getKYCReviews: (state: ReviewsState): Array<KYCReview> => state.KYCReviews,
  getKYCSelectedAppID: (state: ReviewsState): string => state.SelectedKYCAppID,
  getGoodReviews: (state: ReviewsState): Array<GoodReview> => state.GoodReviews
}

export { ReviewGetters, getters }
