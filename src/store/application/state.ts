import { AppRole } from '../user-helper/types'
import { App, AppGood, Application, AppWithdrawSetting, Recommend } from './types'

interface ApplicationState {
  Application?: Application
  Apps?: App
  AppRoles: Array<AppRole>
  AppGoods: Array<AppGood>
  Recommends: Array<Recommend>
  AppWithdrawSettings: Array<AppWithdrawSetting>
}

function state (): ApplicationState {
  return {
    AppRoles: [],
    AppGoods: [],
    Recommends: [],
    AppWithdrawSettings: []
  }
}

export {
  state,
  ApplicationState
}
