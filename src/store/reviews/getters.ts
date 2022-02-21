import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { ReviewsState } from './state'
import { KYCReview, WithdrawAddressReview, WithdrawReview } from './types'

type ReviewGetters = {
  getKYCReviews (state: ReviewsState): Array<KYCReview>
  getWithdrawAddressReviews (state: ReviewsState): Array<WithdrawAddressReview>
  getWithdrawReviews (state: ReviewsState): Array<WithdrawReview>
}

const getters: GetterTree<ReviewsState, RootState> & ReviewGetters = {
  getKYCReviews: (state: ReviewsState): Array<KYCReview> => state.KYCReviews,
  getWithdrawAddressReviews: (state: ReviewsState): Array<WithdrawAddressReview> => state.WithdrawAddressReviews,
  getWithdrawReviews: (state: ReviewsState): Array<WithdrawReview> => state.WithdrawReviews
}

export { ReviewGetters, getters }
