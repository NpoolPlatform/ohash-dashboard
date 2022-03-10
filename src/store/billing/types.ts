import { ReqMessage } from '../notifications/types'

interface PlatformBenefit {
  ID: string
  GoodID: string
  BenefitAccountID: string
  Amount: number
  CreateAt: number
  ChainTransactionID: string
  LastBenefitTimestamp: number
}

interface GetPlatformBenefitsRequest {
  Message: ReqMessage
}

interface GetPlatformBenefitsResponse {
  Infos: Array<PlatformBenefit>
}

interface UserWithdraw {
  ID: string
  UserID: string
  CoinTypeID: string
  WithdrawToAccountID: string
  Amount: number
  PlatformTransactionID: string
}

interface GetUserWithdrawsRequest {
  Message: ReqMessage
}

interface GetUserWithdrawsResponse {
  Infos: Array<UserWithdraw>
}

interface CoinAccountTransaction {
  ID: string
  UserID: string
  FromAddressID: string
  ToAddressID: string
  CoinTypeID: string
  Amount: number
  Message: string
  CreateAt: number
  State: string
  ChainTransactionID: string
}

interface GetCoinAccountTransactionsRequest {
  Message: ReqMessage
}

interface GetCoinAccountTransactionsResponse {
  Infos: Array<CoinAccountTransaction>
}

interface UserBenefit {
  ID: string
  UserID: string
  GoodID: string
  CoinTypeID: string
  Amount: string
  CreateAt: number
  OrderID: string
  LastBenefitTimestamp: number
}

interface GetUserBenefitsRequest {
  Message: ReqMessage
}

interface GetUserBenefitsResponse {
  Infos: Array<UserBenefit>
}

interface Payment {
  ID: string
  UserID: string
  GoodID: string
  OrderID: string
  AccountID: string
  StartAmount: number
  FinishAmount: number
  Amount: number
  CoinInfoID: string
  State: string
  ChainTransactionID: string
  PlatformTransactionID: string
  CreateAt: number
  CoinUSDCurrency: number
}

interface GetPaymentsRequest {
  Message: ReqMessage
}

interface GetPaymentsResponse {
  Infos: Array<Payment>
}

interface UserPaymentBalance {
  ID?: string
  UserID?: string
  PaymentID: string
  Amount: number
}

interface GetUserPaymentBalancesRequest {
  Message: ReqMessage
}

interface GetUserPaymentBalancesResponse {
  Infos: Array<UserPaymentBalance>
}

export {
  PlatformBenefit,
  GetPlatformBenefitsRequest,
  GetPlatformBenefitsResponse,
  UserWithdraw,
  GetUserWithdrawsRequest,
  GetUserWithdrawsResponse,
  CoinAccountTransaction,
  GetCoinAccountTransactionsRequest,
  GetCoinAccountTransactionsResponse,
  UserBenefit,
  GetUserBenefitsRequest,
  GetUserBenefitsResponse,
  Payment,
  GetPaymentsRequest,
  GetPaymentsResponse,
  UserPaymentBalance,
  GetUserPaymentBalancesRequest,
  GetUserPaymentBalancesResponse
}
