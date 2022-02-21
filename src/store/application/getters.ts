import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { ApplicationState } from './state'
import { AppGood, Application, AppWithdrawSetting, Recommend } from './types'
import { AppRole } from '../user-helper/types'

type ApplicationGetters = {
  getApplication (state: ApplicationState): Application
  getAppRoles (state: ApplicationState): Array<AppRole>
  getAppGoods (state: ApplicationState): Array<AppGood>
  getRecommends (state: ApplicationState): Array<Recommend>
  getAppWithdrawSettings (state: ApplicationState): Array<AppWithdrawSetting>
  getAppWithdrawSettingByCoin (state: ApplicationState): (coinTypeID: string) => AppWithdrawSetting
}

const getters: GetterTree<ApplicationState, RootState> & ApplicationGetters = {
  getApplication: (state: ApplicationState): Application => state.Application as Application,
  getAppRoles: (state: ApplicationState): Array<AppRole> => state.AppRoles,
  getAppGoods: (state: ApplicationState): Array<AppGood> => state.AppGoods,
  getRecommends: (state: ApplicationState): Array<Recommend> => state.Recommends,
  getAppWithdrawSettings: (state: ApplicationState): Array<AppWithdrawSetting> => state.AppWithdrawSettings,
  getAppWithdrawSettingByCoin: (state: ApplicationState): (coinTypeID: string) => AppWithdrawSetting => {
    return (coinTypeID: string) => {
      for (let i = 0; i < state.AppWithdrawSettings.length; i++) {
        if (state.AppWithdrawSettings[i].CoinTypeID === coinTypeID) {
          return state.AppWithdrawSettings[i]
        }
      }
      return undefined as unknown as AppWithdrawSetting
    }
  }
}

export { ApplicationGetters, getters }
