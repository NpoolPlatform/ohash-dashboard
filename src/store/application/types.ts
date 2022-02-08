import { ReqMessage } from '../notifications/types'
import { AppRole } from '../user-helper/types'

interface App {
  ID: string
  CreatedBy: string
  Name: string
  Logo: string
  Description: string
  CreateAt: number
}

interface AppControl {
  ID: string
  SignupMethods: Array<string>
  ExternSigninMethods: Array<string>
  RecaptchaMethod: string
  KycEnable: boolean
  SigninVerifyEnable: boolean
  InvitationCodeMust: boolean
}

interface BanApp {
  ID: string
  Message: string
}

interface Application {
  App: App
  Ctrl: AppControl
  Ban: BanApp
}

interface GetApplicationResponse {
  Info: Application
}

interface GetApplicationRequest {
  Message: ReqMessage
}

interface CreateApplicationRequest {
  Info: App
  Message: ReqMessage
}

interface CreateApplicationResponse {
  Info: App
}

interface UpdateApplicationRequest {
  Info: App
  Message: ReqMessage
}

interface UpdateApplicationResponse {
  Info: App
}

interface UpdateAppControlRequest {
  Info: AppControl
  Message: ReqMessage
}

interface UpdateAppControlResponse {
  Info: AppControl
}

interface CreateAppControlRequest {
  Info: AppControl
  Message: ReqMessage
}

interface CreateAppControlResponse {
  Info: AppControl
}

interface GetAppRolesRequest {
  Message: ReqMessage
}

interface GetAppRolesResponse {
  Infos: Array<AppRole>
}

interface CreateAppRoleFRequest {
  Message: ReqMessage
  Info: AppRole
}

interface CreateAppRoleFResponse {
  Info: AppRole
}

export {
  App,
  AppControl,
  BanApp,
  Application,
  GetApplicationRequest,
  GetApplicationResponse,
  CreateApplicationRequest,
  CreateApplicationResponse,
  UpdateApplicationRequest,
  UpdateApplicationResponse,
  UpdateAppControlRequest,
  UpdateAppControlResponse,
  CreateAppControlRequest,
  CreateAppControlResponse,
  GetAppRolesRequest,
  GetAppRolesResponse,
  CreateAppRoleFRequest,
  CreateAppRoleFResponse
}
