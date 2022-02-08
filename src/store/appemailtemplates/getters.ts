import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { AppEmailTemplatesState } from './state'
import { AppEmailTemplate } from './types'

type AppEmailTemplateGetters = {
  getAppEmailTemplates (state: AppEmailTemplatesState): Array<AppEmailTemplate>
}

const getters: GetterTree<AppEmailTemplatesState, RootState> & AppEmailTemplateGetters = {
  getAppEmailTemplates: (state: AppEmailTemplatesState): Array<AppEmailTemplate> => state.AppEmailTemplates
}

export { AppEmailTemplateGetters, getters }
