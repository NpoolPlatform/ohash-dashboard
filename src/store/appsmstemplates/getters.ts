import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { AppSMSTemplatesState } from './state'
import { AppSMSTemplate } from './types'

type AppSMSTemplateGetters = {
  getAppSMSTemplatesByApp (state: AppSMSTemplatesState): (appID: string) => Array<AppSMSTemplate>
  getAppSMSTemplateSelectedAppID (state: AppSMSTemplatesState): string
}

const getters: GetterTree<AppSMSTemplatesState, RootState> & AppSMSTemplateGetters = {
  getAppSMSTemplatesByApp: (state: AppSMSTemplatesState): (appID: string) => Array<AppSMSTemplate> => {
    return (appID: string) => {
      return state.AppSMSTemplates.get(appID) as Array<AppSMSTemplate>
    }
  },
  getAppSMSTemplateSelectedAppID: (state: AppSMSTemplatesState): string => state.SelectedAppID as string
}

export { AppSMSTemplateGetters, getters }
