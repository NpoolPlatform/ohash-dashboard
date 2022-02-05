import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { AppContactsState } from './state'
import { AppContact } from './types'

type AppContactMutations<S = AppContactsState> = {
  [MutationTypes.SetAppContactsByApp] (state: S, payload: Array<AppContact>): void
  [MutationTypes.SetAppContact] (state: S, payload: AppContact): void
  [MutationTypes.SetAppContactSelectedAppID] (state: S, payload: string): void
}

const mutations: MutationTree<AppContactsState> & AppContactMutations = {
  [MutationTypes.SetAppContactsByApp] (state: AppContactsState, payload: Array<AppContact>) {
    if (payload.length > 0) {
      state.AppContacts.set(payload[0].AppID, payload)
    }
  },
  [MutationTypes.SetAppContact] (state: AppContactsState, payload: AppContact) {
    let templates = state.AppContacts.get(payload.AppID) as Array<AppContact>
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
    state.AppContacts.set(payload.AppID, templates)
  },
  [MutationTypes.SetAppContactSelectedAppID] (state: AppContactsState, payload: string): void {
    state.SelectedAppID = payload
  }
}

export { AppContactMutations, mutations }
