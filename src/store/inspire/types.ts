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

interface AppCommissionSetting {
  ID: string
  Type: string
  Level: number
  InvitationDiscount: boolean
  UniqueSetting: boolean
}

interface CreateAppCommissionSettingRequest {
  Info: AppCommissionSetting
  Message: ReqMessage
}

interface CreateAppCommissionSettingResponse {
  Info: AppCommissionSetting
}

interface GetAppCommissionSettingRequest {
  Message: ReqMessage
}

interface GetAppCommissionSettingResponse {
  Info: AppCommissionSetting
}

interface UpdateAppCommissionSettingRequest {
  Info: AppCommissionSetting
  Message: ReqMessage
}

interface UpdateAppCommissionSettingResponse {
  Info: AppCommissionSetting
}

interface AppPurchaseAmountSetting {
  ID: string
  UserID: string
  Amount: number
  Percent: number
  Title: string
  BadgeLarge: string
  BadgeSmall: string
  Start: number
  End: number
}

interface CreateAppPurchaseAmountSettingRequest {
  Info: AppPurchaseAmountSetting
  Message: ReqMessage
}

interface CreateAppPurchaseAmountSettingResponse {
  Info: AppPurchaseAmountSetting
}

interface GetAppPurchaseAmountSettingsRequest {
  Message: ReqMessage
}

interface GetAppPurchaseAmountSettingsResponse {
  Infos: Array<AppPurchaseAmountSetting>
}

interface CreateAppPurchaseAmountSettingForAppOtherUserRequest {
  TargetUserID: string
  Info: AppPurchaseAmountSetting
  Message: ReqMessage
}

interface CreateAppPurchaseAmountSettingForAppOtherUserResponse {
  Info: AppPurchaseAmountSetting
}

interface CommissionCoinSetting {
  ID?: string
  CoinTypeID: string
  Using: boolean
}

interface GetCommissionCoinSettingsRequest {
  Message: ReqMessage
}

interface GetCommissionCoinSettingsResponse {
  Infos: Array<CommissionCoinSetting>
}

export {
  UserInvitationCode,
  GetUserInvitationCodesRequest,
  GetUserInvitationCodesResponse,
  CreateUserInvitationCodeForAppOtherUserRequest,
  CreateUserInvitationCodeForAppOtherUserResponse,
  AppCommissionSetting,
  CreateAppCommissionSettingRequest,
  CreateAppCommissionSettingResponse,
  GetAppCommissionSettingRequest,
  GetAppCommissionSettingResponse,
  UpdateAppCommissionSettingRequest,
  UpdateAppCommissionSettingResponse,
  AppPurchaseAmountSetting,
  CreateAppPurchaseAmountSettingRequest,
  CreateAppPurchaseAmountSettingResponse,
  GetAppPurchaseAmountSettingsRequest,
  GetAppPurchaseAmountSettingsResponse,
  CreateAppPurchaseAmountSettingForAppOtherUserRequest,
  CreateAppPurchaseAmountSettingForAppOtherUserResponse,
  CommissionCoinSetting,
  GetCommissionCoinSettingsRequest,
  GetCommissionCoinSettingsResponse
}
