import { ReqMessage } from '../notifications/types'

interface AppAuth {
  ID?: string
  AppID: string
  Resource: string
  Method: string
}

interface AppUserAuth extends AppAuth {
  UserID: string
}

interface AppRoleAuth extends AppAuth {
  RoleID: string
}

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

interface CreateAppAuthForOtherAppRequest {
  TargetAppID: string
  Info: AppAuth
  Message: ReqMessage
}

interface CreateAppAuthForOtherAppResponse {
  Info: Auth
}

interface CreateAppUserAuthForOtherAppRequest {
  TargetAppID: string
  Info: AppUserAuth
  Message: ReqMessage
}

interface CreateAppUserAuthForOtherAppResponse {
  Info: Auth
}

interface CreateAppRoleAuthForOtherAppRequest {
  TargetAppID: string
  Info: AppRoleAuth
  Message: ReqMessage
}

interface CreateAppRoleAuthForOtherAppResponse {
  Info: Auth
}

export {
  Auth,
  GetAuthsByOtherAppRequest,
  GetAuthsByOtherAppResponse,
  CreateAppAuthForOtherAppRequest,
  CreateAppAuthForOtherAppResponse,
  CreateAppUserAuthForOtherAppRequest,
  CreateAppUserAuthForOtherAppResponse,
  CreateAppRoleAuthForOtherAppRequest,
  CreateAppRoleAuthForOtherAppResponse
}
