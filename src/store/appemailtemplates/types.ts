import { ReqMessage } from '../notifications/types'

interface AppEmailTemplate {
  ID?: string
  AppID: string
  LangID: string
  UsedFor: string
  Sender: string
  ReplyTos: Array<string>
  CCTos: Array<string>
  Subject: string
  Body: string
}

interface GetAppEmailTemplatesByAppRequest {
  AppID: string
  Message: ReqMessage
}

interface GetAppEmailTemplatesByAppResponse {
  Infos: ReadonlyArray<AppEmailTemplate>
}

interface GetAppEmailTemplatesByOtherAppRequest {
  TargetAppID: string
  Message: ReqMessage
}

interface GetAppEmailTemplatesByOtherAppResponse {
  Infos: ReadonlyArray<AppEmailTemplate>
}

interface CreateAppEmailTemplateRequest {
  Info: AppEmailTemplate
  Message: ReqMessage
}

interface CreateAppEmailTemplateResponse {
  Info: AppEmailTemplate
}

interface UpdateAppEmailTemplateRequest {
  Info: AppEmailTemplate
  Message: ReqMessage
}

interface UpdateAppEmailTemplateResponse {
  Info: AppEmailTemplate
}

export {
  AppEmailTemplate,
  GetAppEmailTemplatesByAppRequest,
  GetAppEmailTemplatesByAppResponse,
  GetAppEmailTemplatesByOtherAppRequest,
  GetAppEmailTemplatesByOtherAppResponse,
  CreateAppEmailTemplateRequest,
  CreateAppEmailTemplateResponse,
  UpdateAppEmailTemplateRequest,
  UpdateAppEmailTemplateResponse
}
