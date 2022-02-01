import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { AppEmailTemplatesState } from './state'
import { AppEmailTemplate } from './types'

type AppEmailTemplateMutations<S = AppEmailTemplatesState> = {
  [MutationTypes.SetAppEmailTemplatesByApp] (state: S, payload: Array<AppEmailTemplate>): void
  [MutationTypes.SetAppEmailTemplateSelectedAppID] (state: S, payload: string): void
}

const mutations: MutationTree<AppEmailTemplatesState> & AppEmailTemplateMutations = {
  [MutationTypes.SetAppEmailTemplatesByApp] (state: AppEmailTemplatesState, payload: Array<AppEmailTemplate>) {
    if (payload.length > 0) {
      state.AppEmailTemplates.set(payload[0].AppID, payload)
    }
  },
  [MutationTypes.SetAppEmailTemplateSelectedAppID] (state: AppEmailTemplatesState, payload: string): void {
    state.SelectedAppID = payload
  }
}

export { AppEmailTemplateMutations, mutations }
