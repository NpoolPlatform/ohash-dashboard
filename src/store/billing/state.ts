import { CoinAccountTransaction, Payment, PlatformBenefit, UserBenefit, UserPaymentBalance, UserWithdraw } from './types'

interface BillingsState {
  PlatformBenefits: Array<PlatformBenefit>
  UserWithdraws: Array<UserWithdraw>
  Transactions: Array<CoinAccountTransaction>
  UserBenefits: Array<UserBenefit>
  Payments: Array<Payment>
  UserPaymentBalances: Array<UserPaymentBalance>
}

function state (): BillingsState {
  return {
    PlatformBenefits: [],
    UserWithdraws: [],
    Transactions: [],
    UserBenefits: [],
    Payments: [],
    UserPaymentBalances: []
  }
}

export {
  state,
  BillingsState
}
