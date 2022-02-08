import { ReqMessage } from '../notifications/types'

interface AppEmailTemplate {
  ID?: string
  LangID: string
  DefaultToUsername: string
  UsedFor: string
  Sender: string
  ReplyTos: Array<string>
  CCTos: Array<string>
  Subject: string
  Body: string
}

interface GetAppEmailTemplatesRequest {
  Message: ReqMessage
}

interface GetAppEmailTemplatesResponse {
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
  GetAppEmailTemplatesRequest,
  GetAppEmailTemplatesResponse,
  CreateAppEmailTemplateRequest,
  CreateAppEmailTemplateResponse,
  UpdateAppEmailTemplateRequest,
  UpdateAppEmailTemplateResponse
}
