import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { AppEmailTemplatesState } from './state'
import { AppEmailTemplate } from './types'

type AppEmailTemplateMutations<S = AppEmailTemplatesState> = {
  [MutationTypes.SetAppEmailTemplates] (state: S, payload: Array<AppEmailTemplate>): void
  [MutationTypes.SetAppEmailTemplate] (state: S, payload: AppEmailTemplate): void
}

const mutations: MutationTree<AppEmailTemplatesState> & AppEmailTemplateMutations = {
  [MutationTypes.SetAppEmailTemplates] (state: AppEmailTemplatesState, payload: Array<AppEmailTemplate>) {
    state.AppEmailTemplates = payload
  },
  [MutationTypes.SetAppEmailTemplate] (state: AppEmailTemplatesState, payload: AppEmailTemplate) {
    let templates = state.AppEmailTemplates
    if (!templates) {
      templates = [] as Array<AppEmailTemplate>
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
    state.AppEmailTemplates = templates
  }
}

export { AppEmailTemplateMutations, mutations }
