import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { AppContactsState } from './state'
import { AppContact } from './types'

type AppContactMutations<S = AppContactsState> = {
  [MutationTypes.SetAppContacts] (state: S, payload: Array<AppContact>): void
  [MutationTypes.SetAppContact] (state: S, payload: AppContact): void
}

const mutations: MutationTree<AppContactsState> & AppContactMutations = {
  [MutationTypes.SetAppContacts] (state: AppContactsState, payload: Array<AppContact>) {
    state.AppContacts = payload
  },
  [MutationTypes.SetAppContact] (state: AppContactsState, payload: AppContact) {
    let templates = state.AppContacts
    if (!templates) {
      templates = [] as Array<AppContact>
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
    state.AppContacts = templates
  }
}

export { AppContactMutations, mutations }
