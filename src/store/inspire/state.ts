import {
  AppCommissionSetting,
  AppPurchaseAmountSetting,
  AppUserPurchaseAmountSetting,
  CommissionCoinSetting,
  UserInvitationCode
} from './types'

interface InspiresState {
  InvitationCodes: Array<UserInvitationCode>
  AppCommissionSetting: AppCommissionSetting
  AppPurchaseAmountSettings: Array<AppPurchaseAmountSetting>
  AppUserPurchaseAmountSettings: Map<string, Array<AppUserPurchaseAmountSetting>>
  CommissionCoins: Array<CommissionCoinSetting>
}

function state (): InspiresState {
  return {
    InvitationCodes: [],
    AppCommissionSetting: {} as AppCommissionSetting,
    AppPurchaseAmountSettings: [],
    AppUserPurchaseAmountSettings: new Map<string, Array<AppUserPurchaseAmountSetting>>(),
    CommissionCoins: []
  }
}

export {
  state,
  InspiresState
}
