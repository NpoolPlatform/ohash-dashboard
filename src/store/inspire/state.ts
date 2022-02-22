import { UserInvitationCode } from './types'

interface InspiresState {
  InvitationCodes: Array<UserInvitationCode>
}

function state (): InspiresState {
  return {
    InvitationCodes: []
  }
}

export {
  state,
  InspiresState
}
