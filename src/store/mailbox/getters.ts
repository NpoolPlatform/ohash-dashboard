import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { MailboxState } from './state'
import { Announcement } from './types'

type MailboxGetters = {
  getAnnouncements (state: MailboxState): Array<Announcement>
}

const getters: GetterTree<MailboxState, RootState> & MailboxGetters = {
  getAnnouncements (state: MailboxState): Array<Announcement> {
    return state.Announcements
  }
}

export { MailboxGetters, getters }
