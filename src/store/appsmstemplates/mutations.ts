import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { AppSMSTemplatesState } from './state'
import { AppSMSTemplate } from './types'

type AppSMSTemplateMutations<S = AppSMSTemplatesState> = {
  [MutationTypes.SetAppSMSTemplatesByApp] (state: S, payload: Array<AppSMSTemplate>): void
  [MutationTypes.SetAppSMSTemplate] (state: S, payload: AppSMSTemplate): void
  [MutationTypes.SetAppSMSTemplateSelectedAppID] (state: S, payload: string): void
}

const mutations: MutationTree<AppSMSTemplatesState> & AppSMSTemplateMutations = {
  [MutationTypes.SetAppSMSTemplatesByApp] (state: AppSMSTemplatesState, payload: Array<AppSMSTemplate>) {
    if (payload.length > 0) {
      state.AppSMSTemplates.set(payload[0].AppID, payload)
    }
  },
  [MutationTypes.SetAppSMSTemplate] (state: AppSMSTemplatesState, payload: AppSMSTemplate) {
    let templates = state.AppSMSTemplates.get(payload.AppID) as Array<AppSMSTemplate>
    if (!templates) {
      templates = [] as Array<AppSMSTemplate>
    }
    let pos = -1
    for (let i = 0; i < templates.length; i++) {
      if (templates[i].ID === payload.ID) {
        pos = i
        break
      }
    }

    if (pos >= 0) {
      templates.splice(pos, 1, payload)
    } else {
      templates.push(payload)
    }
    state.AppSMSTemplates.set(payload.AppID, templates)
  },
  [MutationTypes.SetAppSMSTemplateSelectedAppID] (state: AppSMSTemplatesState, payload: string): void {
    state.SelectedAppID = payload
  }
}

export { AppSMSTemplateMutations, mutations }
