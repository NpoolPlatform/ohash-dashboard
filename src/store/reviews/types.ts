import { ReqMessage } from '../notifications/types'
import { KYC } from '../kycs/types'
import { UserInfo } from '../user-helper/types'
import { CoinAccount } from '../accounts/types'

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

interface GetKYCReviewsResponse {
  Infos: ReadonlyArray<KYCReview>
}

interface GetKYCReviewsRequest {
  TargetAppID: string
  Message: ReqMessage
}

interface WithdrawAddress {
  ID: string
  CoinTypeID: string
  AccountID: string
  Name: string
  Message: string
  CreateAt: number
}

interface WithdrawAddressReview {
  Address: WithdrawAddress
  Account: CoinAccount
  Review: Review
  User: UserInfo
}

interface GetWithdrawAddressReviewsRequest {
  Message: ReqMessage
}

interface GetWithdrawAddressReviewsResponse {
  Infos: Array<WithdrawAddressReview>
}

interface UpdateReviewRequest {
  Info: Review
  Message: ReqMessage
}

interface UpdateReviewResponse {
  Info: Review
}

interface Withdraw {
  ID: string
  AppID: string
  UserID: string
  CoinTypeID: string
  WithdrawToAccountID: string
  Amount: number
  PlatformTransactionID: string
}

interface WithdrawReview {
  Withdraw: Withdraw
  Review: Review
  User: UserInfo
}

interface GetWithdrawReviewsRequest {
  Message: ReqMessage
}

interface GetWithdrawReviewsResponse {
  Infos: Array<WithdrawReview>
}

interface UpdateUserWithdrawReviewRequest {
  Info: Review
  Message: ReqMessage
}

interface UpdateUserWithdrawReviewResponse {
  Info: WithdrawReview
}

export {
  Review,
  KYCReview,
  GetKYCReviewsRequest,
  GetKYCReviewsResponse,
  UpdateReviewRequest,
  UpdateReviewResponse,
  WithdrawAddressReview,
  GetWithdrawAddressReviewsRequest,
  GetWithdrawAddressReviewsResponse,
  WithdrawReview,
  GetWithdrawReviewsRequest,
  GetWithdrawReviewsResponse,
  UpdateUserWithdrawReviewRequest,
  UpdateUserWithdrawReviewResponse
}
