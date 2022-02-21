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

interface CreateAppRoleRequest {
  Message: ReqMessage
  Info: AppRole
}

interface CreateAppRoleResponse {
  Info: AppRole
}

interface UpdateAppRoleRequest {
  Message: ReqMessage
  Info: AppRole
}

interface UpdateAppRoleResponse {
  Info: AppRole
}

interface AppGood {
  ID?: string
  GoodID: string
  Price: number
  Online: boolean
  InitAreaStrategy?: string
}

interface GetAppGoodsRequest {
  Message: ReqMessage
}

interface GetAppGoodsResponse {
  Infos: Array<AppGood>
}

interface Recommend {
  ID: string
  GoodID: string
  RecommenderID: string
  Message: string
}

interface GetRecommendsRequest {
  Message: ReqMessage
}

interface GetRecommendsResponse {
  Infos: Array<Recommend>
}

interface CreateRecommendRequest {
  Info: Recommend
  Message: ReqMessage
}

interface CreateRecommendResponse {
  Info: Recommend
}

interface SetAppGoodPriceRequest {
  Info: AppGood
  Message: ReqMessage
}

interface SetAppGoodPriceResponse {
  Info: AppGood
}

interface SetAppGoodOnlineRequest {
  Info: AppGood
  Message: ReqMessage
}

interface SetAppGoodOnlineResponse {
  Info: AppGood
}

interface SetAppGoodOfflineRequest {
  Info: AppGood
  Message: ReqMessage
}

interface SetAppGoodOfflineResponse {
  Info: AppGood
}

interface AppWithdrawSetting {
  ID?: string
  CoinTypeID: string
  WithdrawAutoReviewCoinAmount: number
}

interface GetAppWithdrawSettingsRequest {
  Message: ReqMessage
}

interface GetAppWithdrawSettingsResponse {
  Infos: Array<AppWithdrawSetting>
}

interface CreateAppWithdrawSettingRequest {
  Info: AppWithdrawSetting
  Message: ReqMessage
}

interface CreateAppWithdrawSettingResponse {
  Info: AppWithdrawSetting
}

interface UpdateAppWithdrawSettingRequest {
  Info: AppWithdrawSetting
  Message: ReqMessage
}

interface UpdateAppWithdrawSettingResponse {
  Info: AppWithdrawSetting
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
  CreateAppRoleRequest,
  CreateAppRoleResponse,
  UpdateAppRoleRequest,
  UpdateAppRoleResponse,
  AppGood,
  GetAppGoodsRequest,
  GetAppGoodsResponse,
  Recommend,
  GetRecommendsRequest,
  GetRecommendsResponse,
  CreateRecommendRequest,
  CreateRecommendResponse,
  SetAppGoodPriceRequest,
  SetAppGoodPriceResponse,
  SetAppGoodOnlineRequest,
  SetAppGoodOnlineResponse,
  SetAppGoodOfflineRequest,
  SetAppGoodOfflineResponse,
  AppWithdrawSetting,
  GetAppWithdrawSettingsRequest,
  GetAppWithdrawSettingsResponse,
  CreateAppWithdrawSettingRequest,
  CreateAppWithdrawSettingResponse,
  UpdateAppWithdrawSettingRequest,
  UpdateAppWithdrawSettingResponse
}
