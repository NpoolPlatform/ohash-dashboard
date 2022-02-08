import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { AppSMSTemplatesState } from './state'
import { AppSMSTemplate } from './types'

type AppSMSTemplateMutations<S = AppSMSTemplatesState> = {
  [MutationTypes.SetAppSMSTemplates] (state: S, payload: Array<AppSMSTemplate>): void
  [MutationTypes.SetAppSMSTemplate] (state: S, payload: AppSMSTemplate): void
}

const mutations: MutationTree<AppSMSTemplatesState> & AppSMSTemplateMutations = {
  [MutationTypes.SetAppSMSTemplates] (state: AppSMSTemplatesState, payload: Array<AppSMSTemplate>) {
    state.AppSMSTemplates = payload
  },
  [MutationTypes.SetAppSMSTemplate] (state: AppSMSTemplatesState, payload: AppSMSTemplate) {
    let templates = state.AppSMSTemplates
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

    state.AppSMSTemplates = templates
  }
}

export { AppSMSTemplateMutations, mutations }
