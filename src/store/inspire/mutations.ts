import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { InspiresState } from './state'
import { UserInvitationCode } from './types'

type InspireMutations<S = InspiresState> = {
  [MutationTypes.SetUserInvitationCodes] (state: S, payload: Array<UserInvitationCode>): void
  [MutationTypes.AppendUserInvitationCode] (state: S, payload: UserInvitationCode): void
}

const mutations: MutationTree<InspiresState> & InspireMutations = {
  [MutationTypes.SetUserInvitationCodes] (state: InspiresState, payload: Array<UserInvitationCode>) {
    state.InvitationCodes = payload
  },
  [MutationTypes.AppendUserInvitationCode] (state: InspiresState, payload: UserInvitationCode): void {
    state.InvitationCodes.push(payload)
  }
}

export { InspireMutations, mutations }
