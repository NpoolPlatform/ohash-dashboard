import {
  AppCommissionSetting,
  AppPurchaseAmountSetting,
  CommissionCoinSetting,
  UserInvitationCode
} from './types'

interface InspiresState {
  InvitationCodes: Array<UserInvitationCode>
  AppCommissionSetting: AppCommissionSetting
  AppPurchaseAmountSettings: Array<AppPurchaseAmountSetting>
  CommissionCoins: Array<CommissionCoinSetting>
}

function state (): InspiresState {
  return {
    InvitationCodes: [],
    AppCommissionSetting: {} as AppCommissionSetting,
    AppPurchaseAmountSettings: [],
    CommissionCoins: []
  }
}

export {
  state,
  InspiresState
}
