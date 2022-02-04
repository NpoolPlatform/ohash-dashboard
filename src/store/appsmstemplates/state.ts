import { AppSMSTemplate } from './types'

interface AppSMSTemplatesState {
  AppSMSTemplates: Map<string, Array<AppSMSTemplate>>
  SelectedAppID?: string
}

function state (): AppSMSTemplatesState {
  return {
    AppSMSTemplates: new Map<string, Array<AppSMSTemplate>>()
  }
}

export {
  state,
  AppSMSTemplatesState
}
