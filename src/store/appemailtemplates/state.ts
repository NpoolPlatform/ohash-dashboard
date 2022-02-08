import { AppEmailTemplate } from './types'

interface AppEmailTemplatesState {
  AppEmailTemplates: Array<AppEmailTemplate>
}

function state (): AppEmailTemplatesState {
  return {
    AppEmailTemplates: [] as Array<AppEmailTemplate>
  }
}

export {
  state,
  AppEmailTemplatesState
}
