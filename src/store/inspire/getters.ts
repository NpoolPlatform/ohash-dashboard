import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { InspiresState } from './state'
import {
  AppCommissionSetting,
  AppPurchaseAmountSetting,
  AppUserPurchaseAmountSetting,
  CommissionCoinSetting,
  UserInvitationCode
} from './types'

type InspireGetters = {
  getUserInvitationCodes (state: InspiresState): Array<UserInvitationCode>
  getAppCommissionSetting (state: InspiresState): AppCommissionSetting
  getAppPurchaseAmountSettings (state: InspiresState): Array<AppPurchaseAmountSetting>
  getAppUserPurchaseAmountSettingsByUser (state: InspiresState): (userID: string) => Array<AppUserPurchaseAmountSetting>
  getCommissionCoins (state: InspiresState): Array<CommissionCoinSetting>
}

const getters: GetterTree<InspiresState, RootState> & InspireGetters = {
  getUserInvitationCodes: (state: InspiresState): Array<UserInvitationCode> => state.InvitationCodes,
  getAppCommissionSetting: (state: InspiresState): AppCommissionSetting => state.AppCommissionSetting,
  getAppPurchaseAmountSettings: (state: InspiresState): Array<AppPurchaseAmountSetting> => state.AppPurchaseAmountSettings,
  getAppUserPurchaseAmountSettingsByUser: (state: InspiresState): (userID: string) => Array<AppUserPurchaseAmountSetting> => {
    return (userID: string) => {
      return state.AppUserPurchaseAmountSettings.get(userID) as Array<AppUserPurchaseAmountSetting>
    }
  },
  getCommissionCoins: (state: InspiresState): Array<CommissionCoinSetting> => state.CommissionCoins
}

export { InspireGetters, getters }
