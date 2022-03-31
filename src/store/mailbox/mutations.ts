import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { MailboxState } from './state'
import { Announcement } from './types'

type MailboxMutations<S = MailboxState> = {
  [MutationTypes.SetAnnouncements] (state: S, payload: Array<Announcement>): void
  [MutationTypes.SetAnnouncement] (state: S, payload: Announcement): void
}

const mutations: MutationTree<MailboxState> & MailboxMutations = {
  [MutationTypes.SetAnnouncements] (state: MailboxState, payload: Array<Announcement>) {
    state.Announcements = payload
  },
  [MutationTypes.SetAnnouncement] (state: MailboxState, payload: Announcement) {
    for (let i = 0; i < state.Announcements.length; i++) {
      if (state.Announcements[i].ID === payload.ID) {
        state.Announcements.splice(i, 1, payload)
        return
      }
    }
    state.Announcements.splice(0, 0, payload)
  }
}

export { MailboxMutations, mutations }
