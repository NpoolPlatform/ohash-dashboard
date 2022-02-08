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

interface DeleteAppAuthRequest {
  ID: string
  Message: ReqMessage
}

interface DeleteAppAuthResponse {
  Info: Auth
}

interface DeleteAppUserAuthRequest {
  ID: string
  Message: ReqMessage
}

interface DeleteAppUserAuthResponse {
  Info: Auth
}

interface DeleteAppRoleAuthRequest {
  ID: string
  Message: ReqMessage
}

interface DeleteAppRoleAuthResponse {
  Info: Auth
}

interface AuthHistory {
  ID: string
  AppID: string
  UserID: string
  Resource: string
  Method: string
  Allowed: boolean
  CreateAt: number
}

interface GetAuthHistoriesByOtherAppRequest {
  TargetAppID: string
  Message: ReqMessage
}

interface GetAuthHistoriesByOtherAppResponse {
  Infos: Array<AuthHistory>
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
  CreateAppRoleAuthForOtherAppResponse,
  DeleteAppAuthRequest,
  DeleteAppAuthResponse,
  DeleteAppUserAuthRequest,
  DeleteAppUserAuthResponse,
  DeleteAppRoleAuthRequest,
  DeleteAppRoleAuthResponse,
  AuthHistory,
  GetAuthHistoriesByOtherAppRequest,
  GetAuthHistoriesByOtherAppResponse
}
