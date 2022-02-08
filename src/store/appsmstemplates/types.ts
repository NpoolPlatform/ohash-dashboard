import { ReqMessage } from '../notifications/types'

interface AppSMSTemplate {
  ID?: string
  LangID: string
  UsedFor: string
  Subject: string
  Message: string
}

interface GetAppSMSTemplatesRequest {
  Message: ReqMessage
}

interface GetAppSMSTemplatesResponse {
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
  GetAppSMSTemplatesRequest,
  GetAppSMSTemplatesResponse,
  CreateAppSMSTemplateRequest,
  CreateAppSMSTemplateResponse,
  UpdateAppSMSTemplateRequest,
  UpdateAppSMSTemplateResponse
}
