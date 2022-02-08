import { LoginType } from './const'
import { IReCaptchaComposition } from 'vue-recaptcha-v3'
import { ReqMessage } from '../notifications/types'

interface LoginRequest {
  Account: string
  PasswordHash: string
  ManMachineSpec: string
  EnvironmentSpec?: string
  LoginType: LoginType
  Token?: string
  Message: ReqMessage
}

interface AppUser {
  ID?: string
  EmailAddress?: string
  PhoneNO?: string
  ImportedFromApp?: string
  CreateAt?: number
}

interface AppRole {
  ID: string
  CreatedBy: string
  Role: string
  Description: string
  Default: boolean
}

interface AppUserExtra {
  ID: string
  UserID: string
  Username: string
  AddressFields: Array<string>
  Gender: string
  PostalCode: string
  Age: number
  Birthday: number
  Avatar: string
  Organization: string
  FirstName: string
  LastName: string
}

interface AppUserControl {
  ID: string
  UserID: string
}

interface BanAppUser {
  ID: string
  UserID: string
  Message: string
}

interface UserInfo {
  User?: AppUser
  Extra?: AppUserExtra
  Ctrl?: AppUserControl
  Ban?: BanAppUser
  Roles?: Array<AppRole>
}

interface LoginResponse {
  Info: UserInfo
  Token: string
}

interface GetGoogleTokenRequest {
  Recaptcha: IReCaptchaComposition | undefined
  Req: string
  Message: ReqMessage
}

interface GoogleToken {
  Req: string
  Token: string
}

interface GetAppUserInfosRequest {
  Message: ReqMessage
}

interface GetAppUserInfosResponse {
  Infos: Array<UserInfo>
}

interface AppRoleUser {
  ID?: string
  RoleID: string
  UserID?: string
}

interface GetAppRoleUsersRequest {
  Message: ReqMessage
}

interface GetAppRoleUsersResponse {
  Infos: Array<AppRoleUser>
}

interface CreateAppRoleUserForAppOtherUserRequest {
  TargetUserID: string
  Info: AppRoleUser
  Message: ReqMessage
}

interface CreateAppRoleUserForAppOtherUserResponse {
  Info: AppRoleUser
}

interface DeleteAppRoleUserRequest {
  ID: string
  Message: ReqMessage
}

interface DeleteAppRoleUserResponse {
  Info: AppRoleUser
}

export {
  LoginRequest,
  LoginResponse,
  AppUser,
  AppRole,
  AppRoleUser,
  UserInfo,
  GetGoogleTokenRequest,
  GoogleToken,
  GetAppUserInfosRequest,
  GetAppUserInfosResponse,
  GetAppRoleUsersRequest,
  GetAppRoleUsersResponse,
  CreateAppRoleUserForAppOtherUserRequest,
  CreateAppRoleUserForAppOtherUserResponse,
  DeleteAppRoleUserRequest,
  DeleteAppRoleUserResponse
}
