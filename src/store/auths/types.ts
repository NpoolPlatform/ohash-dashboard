import { ReqMessage } from '../notifications/types'

interface Auth {
  ID: string
  AppID: string
  RoleID: string
  UserID: string
  Resource: string
  Method: string
}

interface GetAuthsByOtherAppRequest {
  TargetAppID: string
  Message: ReqMessage
}

interface GetAuthsByOtherAppResponse {
  Infos: Array<Auth>
}

export {
  Auth,
  GetAuthsByOtherAppRequest,
  GetAuthsByOtherAppResponse
}
