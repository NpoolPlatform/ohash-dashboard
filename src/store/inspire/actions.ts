import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'
import { InspiresState } from './state'
import { ActionTree } from 'vuex'
import { AugmentedActionContext, RootState } from '../index'
import { InspireMutations } from './mutations'
import { API } from './const'
import { doAction } from '../action'
import { CreateUserInvitationCodeForAppOtherUserRequest, CreateUserInvitationCodeForAppOtherUserResponse, GetUserInvitationCodesRequest, GetUserInvitationCodesResponse } from './types'

interface InspireActions {
  [ActionTypes.GetUserInvitationCodeByApp]({
    commit
  }: AugmentedActionContext<
  InspiresState,
    RootState,
    InspireMutations<InspiresState>>,
    req: GetUserInvitationCodesRequest): void

  [ActionTypes.CreateUserInvitationCodeForAppOtherUser]({
    commit
  }: AugmentedActionContext<
  InspiresState,
    RootState,
    InspireMutations<InspiresState>>,
    req: CreateUserInvitationCodeForAppOtherUserRequest): void
}

const actions: ActionTree<InspiresState, RootState> = {
  [ActionTypes.GetUserInvitationCodeByApp] ({ commit }, req: GetUserInvitationCodesRequest) {
    doAction<GetUserInvitationCodesRequest, GetUserInvitationCodesResponse>(
      commit,
      API.GET_USER_INVITATION_CODES_BY_APP,
      req,
      req.Message,
      (resp: GetUserInvitationCodesResponse): void => {
        commit(MutationTypes.SetUserInvitationCodes, resp.Infos)
      })
  },

  [ActionTypes.CreateUserInvitationCodeForAppOtherUser] ({ commit }, req: CreateUserInvitationCodeForAppOtherUserRequest) {
    doAction<CreateUserInvitationCodeForAppOtherUserRequest, CreateUserInvitationCodeForAppOtherUserResponse>(
      commit,
      API.CREATE_USER_INVITATION_CODE_FOR_APP_OTHER_USER,
      req,
      req.Message,
      (resp: CreateUserInvitationCodeForAppOtherUserResponse): void => {
        commit(MutationTypes.AppendUserInvitationCode, resp.Info)
      })
  }
}

export {
  actions,
  InspireActions
}
