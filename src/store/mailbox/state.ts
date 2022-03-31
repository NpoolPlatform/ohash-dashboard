import { Announcement } from './types'

interface MailboxState {
  Announcements: Array<Announcement>
}

function state (): MailboxState {
  return {
    Announcements: [] as Array<Announcement>
  }
}

export {
  state,
  MailboxState
}
