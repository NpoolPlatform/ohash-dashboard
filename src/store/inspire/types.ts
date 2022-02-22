import { ReqMessage } from '../notifications/types'

interface UserInvitationCode {
  ID?: string
  UserID: string
  InvitationCode?: string
}

interface GetUserInvitationCodesRequest {
  Message: ReqMessage
}

interface GetUserInvitationCodesResponse {
  Infos: Array<UserInvitationCode>
}

interface CreateUserInvitationCodeForAppOtherUserRequest {
  TargetUserID: string
  Info: UserInvitationCode
  Message: ReqMessage
}

interface CreateUserInvitationCodeForAppOtherUserResponse {
  Info: UserInvitationCode
}

export {
  UserInvitationCode,
  GetUserInvitationCodesRequest,
  GetUserInvitationCodesResponse,
  CreateUserInvitationCodeForAppOtherUserRequest,
  CreateUserInvitationCodeForAppOtherUserResponse
}
