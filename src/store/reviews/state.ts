import { KYCReview, GoodReview } from './types'

interface ReviewsState {
  KYCReviews: Array<KYCReview>
  GoodReviews: Array<GoodReview>
}

function state (): ReviewsState {
  return {
    KYCReviews: [] as Array<KYCReview>,
    GoodReviews: [] as Array<GoodReview>
  }
}

export {
  state,
  ReviewsState
}
