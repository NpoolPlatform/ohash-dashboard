import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { AppEmailTemplatesState } from './state'
import { AppEmailTemplate } from './types'

type AppEmailTemplateMutations<S = AppEmailTemplatesState> = {
  [MutationTypes.SetAppEmailTemplatesByApp] (state: S, payload: Array<AppEmailTemplate>): void
  [MutationTypes.SetAppEmailTemplate] (state: S, payload: AppEmailTemplate): void
  [MutationTypes.SetAppEmailTemplateSelectedAppID] (state: S, payload: string): void
}

const mutations: MutationTree<AppEmailTemplatesState> & AppEmailTemplateMutations = {
  [MutationTypes.SetAppEmailTemplatesByApp] (state: AppEmailTemplatesState, payload: Array<AppEmailTemplate>) {
    if (payload.length > 0) {
      state.AppEmailTemplates.set(payload[0].AppID, payload)
    }
  },
  [MutationTypes.SetAppEmailTemplate] (state: AppEmailTemplatesState, payload: AppEmailTemplate) {
    let templates = state.AppEmailTemplates.get(payload.AppID) as Array<AppEmailTemplate>
    if (!templates) {
      templates = [] as Array<AppEmailTemplate>
    }
    templates.push(payload)
    state.AppEmailTemplates.set(payload.AppID, templates)
  },
  [MutationTypes.SetAppEmailTemplateSelectedAppID] (state: AppEmailTemplatesState, payload: string): void {
    state.SelectedAppID = payload
  }
}

export { AppEmailTemplateMutations, mutations }
