import { AppID } from 'src/const/const'
import { KYCReview, GoodReview } from './types'

interface ReviewsState {
  KYCReviews: Array<KYCReview>
  GoodReviews: Array<GoodReview>
  SelectedKYCAppID: string
}

function state (): ReviewsState {
  return {
    KYCReviews: [] as Array<KYCReview>,
    GoodReviews: [] as Array<GoodReview>,
    SelectedKYCAppID: AppID
  }
}

export {
  state,
  ReviewsState
}
