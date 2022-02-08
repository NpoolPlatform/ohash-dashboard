import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { AppSMSTemplatesState } from './state'
import { AppSMSTemplate } from './types'

type AppSMSTemplateGetters = {
  getAppSMSTemplates (state: AppSMSTemplatesState): Array<AppSMSTemplate>
}

const getters: GetterTree<AppSMSTemplatesState, RootState> & AppSMSTemplateGetters = {
  getAppSMSTemplates: (state: AppSMSTemplatesState): Array<AppSMSTemplate> => state.AppSMSTemplates
}

export { AppSMSTemplateGetters, getters }
