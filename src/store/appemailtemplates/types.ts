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

interface CreateAppEmailTemplateRequest {
  Info: AppEmailTemplate
  Message: ReqMessage
}

interface CreateAppEmailTemplateResponse {
  Info: AppEmailTemplate
}

export {
  AppEmailTemplate,
  GetAppEmailTemplatesByAppRequest,
  GetAppEmailTemplatesByAppResponse,
  CreateAppEmailTemplateRequest,
  CreateAppEmailTemplateResponse
}
