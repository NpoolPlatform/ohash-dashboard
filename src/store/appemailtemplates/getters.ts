import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { AppEmailTemplatesState } from './state'
import { AppEmailTemplate } from './types'

type AppEmailTemplateGetters = {
  getAppEmailTemplatesByApp (state: AppEmailTemplatesState): (appID: string) => Array<AppEmailTemplate>
  getAppEmailTemplateSelectedAppID (state: AppEmailTemplatesState): string
}

const getters: GetterTree<AppEmailTemplatesState, RootState> & AppEmailTemplateGetters = {
  getAppEmailTemplatesByApp: (state: AppEmailTemplatesState): (appID: string) => Array<AppEmailTemplate> => {
    return (appID: string) => {
      return state.AppEmailTemplates.get(appID) as Array<AppEmailTemplate>
    }
  },
  getAppEmailTemplateSelectedAppID: (state: AppEmailTemplatesState): string => state.SelectedAppID as string
}

export { AppEmailTemplateGetters, getters }
