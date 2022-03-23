import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { InspiresState } from './state'
import {
  AppCommissionSetting,
  AppPurchaseAmountSetting,
  CommissionCoinSetting,
  UserInvitationCode
} from './types'

type InspireGetters = {
  getUserInvitationCodes (state: InspiresState): Array<UserInvitationCode>
  getAppCommissionSetting (state: InspiresState): AppCommissionSetting
  getAppPurchaseAmountSettings (state: InspiresState): Array<AppPurchaseAmountSetting>
  getCommissionCoins (state: InspiresState): Array<CommissionCoinSetting>
}

const getters: GetterTree<InspiresState, RootState> & InspireGetters = {
  getUserInvitationCodes: (state: InspiresState): Array<UserInvitationCode> => state.InvitationCodes,
  getAppCommissionSetting: (state: InspiresState): AppCommissionSetting => state.AppCommissionSetting,
  getAppPurchaseAmountSettings: (state: InspiresState): Array<AppPurchaseAmountSetting> => state.AppPurchaseAmountSettings,
  getCommissionCoins: (state: InspiresState): Array<CommissionCoinSetting> => state.CommissionCoins
}

export { InspireGetters, getters }
