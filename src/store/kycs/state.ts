import { AppID } from 'src/const/const'
import { KYCReview } from './types'

interface KYCsState {
  KYCReviews: Array<KYCReview>
  SelectedAppID: string
}

function state (): KYCsState {
  return {
    KYCReviews: [] as Array<KYCReview>,
    SelectedAppID: AppID
  }
}

export {
  state,
  KYCsState
}
