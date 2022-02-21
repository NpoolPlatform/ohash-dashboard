import { KYCReview, WithdrawAddressReview, WithdrawReview } from './types'

interface ReviewsState {
  KYCReviews: Array<KYCReview>
  WithdrawAddressReviews: Array<WithdrawAddressReview>
  WithdrawReviews: Array<WithdrawReview>
}

function state (): ReviewsState {
  return {
    KYCReviews: [],
    WithdrawAddressReviews: [],
    WithdrawReviews: []
  }
}

export {
  state,
  ReviewsState
}
