import { LocaleMessages, VueMessageType } from 'vue-i18n'
import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { LanguagesState } from './state'
import { Language } from './types'

type LanguageGetters = {
  getLanguage (state: LanguagesState): Language
  getLanguages (state: LanguagesState): Array<Language>
  getLangShort (state: LanguagesState): string
  getMessages (state: LanguagesState): LocaleMessages<VueMessageType>
  getLanguageSelectedAppID (state: LanguagesState): string
  getAppLangInfosByApp (state: LanguagesState): (appID: string) => Array<Language>
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
  getLanguageSelectedAppID: (state: LanguagesState): string => state.SelectedAppID as string,
  getAppLangInfosByApp: (state: LanguagesState): (appID: string) => Array<Language> => {
    return (appID: string) => {
      const appLangInfos = state.AppLangInfos.get(appID)
      const languages = [] as Array<Language>
      appLangInfos?.forEach((info) => {
        languages.push(info.Lang)
      })
      return languages
    }
  }
}

export { LanguageGetters, getters }
