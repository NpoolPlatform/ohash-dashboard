import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { InspiresState } from './state'
import { UserInvitationCode } from './types'

type InspireGetters = {
  getUserInvitationCodes (state: InspiresState): Array<UserInvitationCode>
}

const getters: GetterTree<InspiresState, RootState> & InspireGetters = {
  getUserInvitationCodes: (state: InspiresState): Array<UserInvitationCode> => state.InvitationCodes
}

export { InspireGetters, getters }
