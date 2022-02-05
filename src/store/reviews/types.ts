import { ReqMessage } from '../notifications/types'
import { KYC } from '../kycs/types'
import { Good } from '../goods/types'
import { UserInfo } from '../user-helper/types'

interface Review {
  ID?: string
  AppID?: string
  ObjectType?: string
  ReviewerID?: string
  State?: string
  Message?: string
  ObjectID?: string
  Domain?: string
  CreateAt?: number
}

interface KYCReview {
  Kyc: KYC
  Review: Review
  User: UserInfo
}

interface GetKYCReviewsByOtherAppResponse {
  Infos: ReadonlyArray<KYCReview>
}

interface GetKYCReviewsByOtherAppRequest {
  TargetAppID: string
  Message: ReqMessage
}

interface GoodReview {
  Good: Good
  Review: Review
}

interface GetGoodReviewsRequest {
  Message: ReqMessage
}

interface GetGoodReviewsResponse {
  Infos: ReadonlyArray<GoodReview>
}

interface UpdateReviewRequest {
  Info: Review
  Message: ReqMessage
}

interface UpdateReviewResponse {
  Info: Review
}

export {
  Review,
  KYCReview,
  GetKYCReviewsByOtherAppRequest,
  GetKYCReviewsByOtherAppResponse,
  GoodReview,
  GetGoodReviewsRequest,
  GetGoodReviewsResponse,
  UpdateReviewRequest,
  UpdateReviewResponse
}
