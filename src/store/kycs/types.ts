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

interface GoodReview {
  ID: string
}

interface GetGoodReviewsRequest {
  Message: ReqMessage
}

interface GetGoodReviewsResponse {
  Infos: ReadonlyArray<GoodReview>
}

export {
  KYCReview,
  GetKYCReviewsRequest,
  GetKYCReviewsResponse,
  GoodReview,
  GetGoodReviewsRequest,
  GetGoodReviewsResponse
}
