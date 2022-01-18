import { LocaleMessages, VueMessageType } from 'vue-i18n'
import { Language } from './types'

interface LanguagesState {
  Languages: Map<string, Language>
  CurLang: string
  Message?: LocaleMessages<VueMessageType>
}

const DefaultLang = 'en-US'
const DefaultLanguage = {
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
    CurLang: DefaultLang
  }
}

export {
  state,
  LanguagesState
}
