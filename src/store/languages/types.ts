import { ReqMessage } from '../notifications/types'

interface Language {
  ID: string
  Lang: string
  Logo: string
  Name: string
  Short: string
}

interface GetLanguagesResponse {
  Infos: ReadonlyArray<Language>
}

interface GetLanguagesRequest {
  Message: ReqMessage
}

interface AppLanguage {
  ID: string
  LangID: string
}

interface AppLangInfo {
  AppLang: AppLanguage
  Lang: Language
}

interface GetAppLangInfosByAppRequest {
  Message: ReqMessage
}

interface GetAppLangInfosByAppResponse {
  Infos: Array<AppLangInfo>
}

interface GetAppLangInfosRequest {
  Message: ReqMessage
}

interface GetAppLangInfosResponse {
  Infos: Array<AppLangInfo>
}

interface AddLanguageRequest {
  Info: Language
  Message: ReqMessage
}

interface AddLanguageResponse {
  Info: Language
}

interface CreateAppLanguageRequest {
  Info: AppLanguage
  Message: ReqMessage
}

interface CreateAppLanguageResponse {
  Info: AppLanguage
}

interface Message {
  ID: string
  LangID: string
  MessageID: string
  Message: string
  BatchGet: boolean
}

interface GetMessagesByLangRequest {
  LangID: string
  Message: ReqMessage
}

interface GetMessagesByLangResponse {
  Infos: Array<Message>
}

interface CreateMessageRequest {
  Info: Message
  Message: ReqMessage
}

interface CreateMessageResponse {
  Info: Message
}

interface UpdateMessageRequest {
  Info: Message
  Message: ReqMessage
}

interface UpdateMessageResponse {
  Info: Message
}

export {
  Language,
  GetLanguagesRequest,
  GetLanguagesResponse,
  AppLangInfo,
  GetAppLangInfosByAppRequest,
  GetAppLangInfosByAppResponse,
  GetAppLangInfosRequest,
  GetAppLangInfosResponse,
  AddLanguageRequest,
  AddLanguageResponse,
  AppLanguage,
  CreateAppLanguageRequest,
  CreateAppLanguageResponse,
  Message,
  GetMessagesByLangRequest,
  GetMessagesByLangResponse,
  CreateMessageRequest,
  CreateMessageResponse,
  UpdateMessageRequest,
  UpdateMessageResponse
}
