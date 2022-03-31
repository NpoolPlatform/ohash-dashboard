import { LocaleMessages, VueMessageType } from 'vue-i18n'
import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { LanguagesState } from './state'
import { Language, Message } from './types'

type LanguageGetters = {
  getLanguage (state: LanguagesState): Language
  getLanguages (state: LanguagesState): Array<Language>
  getLangShort (state: LanguagesState): string
  getMessages (state: LanguagesState): LocaleMessages<VueMessageType>
  getLangMessages (state: LanguagesState): (langID: string) => Array<Message>
  getAppLangInfos (state: LanguagesState): Array<Language>
}

const getters: GetterTree<LanguagesState, RootState> & LanguageGetters = {
  getLanguage: (state: LanguagesState): Language => state.Languages.get(state.CurLang) as Language,
  getLanguages: (state: LanguagesState): Array<Language> => {
    const langs = [] as Array<Language>
    state.Languages.forEach((lang) => {
      langs.push(lang)
    })
    return langs
  },
  getLangShort: (state: LanguagesState): string => state.CurLang,
  getMessages: (state: LanguagesState): LocaleMessages<VueMessageType> => state.Messages as LocaleMessages<VueMessageType>,
  getAppLangInfos: (state: LanguagesState): Array<Language> => {
    const languages = [] as Array<Language>
    state.AppLangInfos.forEach((info) => {
      languages.push(info.Lang)
    })
    return languages
  },
  getLangMessages (state: LanguagesState): (langID: string) => Array<Message> {
    return (langID: string) => {
      return state.LangMessages.get(langID) as Array<Message>
    }
  }
}

export { LanguageGetters, getters }
