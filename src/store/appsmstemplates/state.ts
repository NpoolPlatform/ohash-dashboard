import { AppSMSTemplate } from './types'

interface AppSMSTemplatesState {
  AppSMSTemplates: Array<AppSMSTemplate>
}

function state (): AppSMSTemplatesState {
  return {
    AppSMSTemplates: [] as Array<AppSMSTemplate>
  }
}

export {
  state,
  AppSMSTemplatesState
}
