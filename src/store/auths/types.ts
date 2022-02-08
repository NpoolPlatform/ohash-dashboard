import { ReqMessage } from '../notifications/types'

interface AppAuth {
  ID?: string
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
  RoleID: string
  UserID: string
  Resource: string
  Method: string
}

interface GetAuthsRequest {
  Message: ReqMessage
}

interface GetAuthsResponse {
  Infos: Array<Auth>
}

interface CreateAppAuthRequest {
  Info: AppAuth
  Message: ReqMessage
}

interface CreateAppAuthResponse {
  Info: Auth
}

interface CreateAppUserAuthRequest {
  Info: AppUserAuth
  Message: ReqMessage
}

interface CreateAppUserAuthResponse {
  Info: Auth
}

interface CreateAppRoleAuthRequest {
  Info: AppRoleAuth
  Message: ReqMessage
}

interface CreateAppRoleAuthResponse {
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
  UserID: string
  Resource: string
  Method: string
  Allowed: boolean
  CreateAt: number
}

interface GetAuthHistoriesRequest {
  Message: ReqMessage
}

interface GetAuthHistoriesResponse {
  Infos: Array<AuthHistory>
}

export {
  Auth,
  GetAuthsRequest,
  GetAuthsResponse,
  CreateAppAuthRequest,
  CreateAppAuthResponse,
  CreateAppUserAuthRequest,
  CreateAppUserAuthResponse,
  CreateAppRoleAuthRequest,
  CreateAppRoleAuthResponse,
  DeleteAppAuthRequest,
  DeleteAppAuthResponse,
  DeleteAppUserAuthRequest,
  DeleteAppUserAuthResponse,
  DeleteAppRoleAuthRequest,
  DeleteAppRoleAuthResponse,
  AuthHistory,
  GetAuthHistoriesRequest,
  GetAuthHistoriesResponse
}
