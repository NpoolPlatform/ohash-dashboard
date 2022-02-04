import { ReqMessage } from '../notifications/types'

interface AppSMSTemplate {
  ID?: string
  AppID: string
  LangID: string
  UsedFor: string
  Subject: string
  Message: string
}

interface GetAppSMSTemplatesByAppRequest {
  AppID: string
  Message: ReqMessage
}

interface GetAppSMSTemplatesByAppResponse {
  Infos: ReadonlyArray<AppSMSTemplate>
}

interface GetAppSMSTemplatesByOtherAppRequest {
  TargetAppID: string
  Message: ReqMessage
}

interface GetAppSMSTemplatesByOtherAppResponse {
  Infos: ReadonlyArray<AppSMSTemplate>
}

interface CreateAppSMSTemplateRequest {
  Info: AppSMSTemplate
  Message: ReqMessage
}

interface CreateAppSMSTemplateResponse {
  Info: AppSMSTemplate
}

interface UpdateAppSMSTemplateRequest {
  Info: AppSMSTemplate
  Message: ReqMessage
}

interface UpdateAppSMSTemplateResponse {
  Info: AppSMSTemplate
}

export {
  AppSMSTemplate,
  GetAppSMSTemplatesByAppRequest,
  GetAppSMSTemplatesByAppResponse,
  GetAppSMSTemplatesByOtherAppRequest,
  GetAppSMSTemplatesByOtherAppResponse,
  CreateAppSMSTemplateRequest,
  CreateAppSMSTemplateResponse,
  UpdateAppSMSTemplateRequest,
  UpdateAppSMSTemplateResponse
}
