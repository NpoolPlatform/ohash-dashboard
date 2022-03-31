import { DefaultID } from 'src/const/const'
import { LocaleMessages, VueMessageType } from 'vue-i18n'
import { AppLangInfo, AppLanguage, Language, Message } from './types'

interface LanguagesState {
  Languages: Map<string, Language>
  CurLang: string
  Messages?: LocaleMessages<VueMessageType>
  AppLangInfos: Array<AppLangInfo>
  AppLanguages: Array<AppLanguage>
  LangMessages: Map<string, Array<Message>>
}

const DefaultLang = 'en-US'
const DefaultLanguage = {
  ID: DefaultID,
  Lang: DefaultLang,
  Logo: 'icons/england.png',
  Name: 'English',
  Short: 'En'
}

function state (): LanguagesState {
  const defaultLanguage = new Map<string, Language>()
  defaultLanguage.set(DefaultLang, DefaultLanguage)
  return {
    Languages: defaultLanguage,
    CurLang: DefaultLang,
    AppLangInfos: [] as Array<AppLangInfo>,
    AppLanguages: [] as Array<AppLanguage>,
    LangMessages: new Map<string, Array<Message>>()
  }
}

export {
  state,
  LanguagesState
}
