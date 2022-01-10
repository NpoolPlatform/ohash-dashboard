import { AppID } from 'src/const/const'
import { KYCReview, GoodReview } from './types'

interface KYCsState {
  KYCReviews: Array<KYCReview>
  GoodReviews: Array<GoodReview>
  SelectedAppID: string
}

function state (): KYCsState {
  return {
    KYCReviews: [] as Array<KYCReview>,
    GoodReviews: [] as Array<GoodReview>,
    SelectedAppID: AppID
  }
}

export {
  state,
  KYCsState
}
