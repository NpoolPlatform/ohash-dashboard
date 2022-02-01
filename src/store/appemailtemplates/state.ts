import { AppEmailTemplate } from './types'

interface AppEmailTemplatesState {
  AppEmailTemplates: Map<string, Array<AppEmailTemplate>>
  SelectedAppID?: string
}

function state (): AppEmailTemplatesState {
  return {
    AppEmailTemplates: new Map<string, Array<AppEmailTemplate>>()
  }
}

export {
  state,
  AppEmailTemplatesState
}
