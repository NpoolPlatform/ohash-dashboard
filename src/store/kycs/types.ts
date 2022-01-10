import { ReqMessage } from '../notifications/types'

interface KYCReview {
  ID: string
}

interface GetKYCReviewsResponse {
  Infos: ReadonlyArray<KYCReview>
}

interface GetKYCReviewsRequest {
  AppID: string
  Message: ReqMessage
}

export {
  KYCReview,
  GetKYCReviewsRequest,
  GetKYCReviewsResponse
}
