import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { InspiresState } from './state'
import {
  AppCommissionSetting,
  AppPurchaseAmountSetting,
  AppUserPurchaseAmountSetting,
  CommissionCoinSetting,
  UserInvitationCode
} from './types'

type InspireMutations<S = InspiresState> = {
  [MutationTypes.SetUserInvitationCodes] (state: S, payload: Array<UserInvitationCode>): void
  [MutationTypes.AppendUserInvitationCode] (state: S, payload: UserInvitationCode): void
  [MutationTypes.SetAppCommissionSetting] (state: S, payload: AppCommissionSetting): void
  [MutationTypes.SetAppPurchaseAmountSettings] (state: S, payload: Array<AppPurchaseAmountSetting>): void
  [MutationTypes.AppendAppPurchaseAmountSetting] (state: S, payload: AppPurchaseAmountSetting): void
  [MutationTypes.SetAppUserPurchaseAmountSettings] (state: S, payload: Array<AppUserPurchaseAmountSetting>): void
  [MutationTypes.AppendAppUserPurchaseAmountSetting] (state: S, payload: AppUserPurchaseAmountSetting): void
  [MutationTypes.SetCommissionCoins] (state: S, payload: Array<CommissionCoinSetting>): void
}

const mutations: MutationTree<InspiresState> & InspireMutations = {
  [MutationTypes.SetUserInvitationCodes] (state: InspiresState, payload: Array<UserInvitationCode>) {
    state.InvitationCodes = payload
  },
  [MutationTypes.AppendUserInvitationCode] (state: InspiresState, payload: UserInvitationCode): void {
    state.InvitationCodes.push(payload)
  },
  [MutationTypes.SetAppCommissionSetting] (state: InspiresState, payload: AppCommissionSetting): void {
    state.AppCommissionSetting = payload
  },
  [MutationTypes.SetAppPurchaseAmountSettings] (state: InspiresState, payload: Array<AppPurchaseAmountSetting>): void {
    state.AppPurchaseAmountSettings = payload
  },
  [MutationTypes.AppendAppPurchaseAmountSetting] (state: InspiresState, payload: AppPurchaseAmountSetting): void {
    state.AppPurchaseAmountSettings.push(payload)
  },
  [MutationTypes.SetAppUserPurchaseAmountSettings] (state: InspiresState, payload: Array<AppUserPurchaseAmountSetting>): void {
    if (payload.length > 0) {
      state.AppUserPurchaseAmountSettings.set(payload[0].UserID, payload)
    }
  },
  [MutationTypes.AppendAppUserPurchaseAmountSetting] (state: InspiresState, payload: AppUserPurchaseAmountSetting): void {
    let userSettings = state.AppUserPurchaseAmountSettings?.get(payload.UserID)
    if (!userSettings) {
      userSettings = [] as Array<AppUserPurchaseAmountSetting>
    }
    userSettings.push(payload)
    state.AppUserPurchaseAmountSettings.set(payload.UserID, userSettings)
  },
  [MutationTypes.SetCommissionCoins] (state: InspiresState, payload: Array<CommissionCoinSetting>): void {
    state.CommissionCoins = payload
  }
}

export { InspireMutations, mutations }
