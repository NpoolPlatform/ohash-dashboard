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
  AppID: string
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

interface GetAppLangInfosByOtherAppRequest {
  TargetAppID: string
  Message: ReqMessage
}

interface GetAppLangInfosByOtherAppResponse {
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

export {
  Language,
  GetLanguagesRequest,
  GetLanguagesResponse,
  AppLangInfo,
  GetAppLangInfosByAppRequest,
  GetAppLangInfosByAppResponse,
  GetAppLangInfosByOtherAppRequest,
  GetAppLangInfosByOtherAppResponse,
  AddLanguageRequest,
  AddLanguageResponse,
  AppLanguage,
  CreateAppLanguageRequest,
  CreateAppLanguageResponse
}
