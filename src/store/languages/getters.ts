import { LocaleMessages, VueMessageType } from 'vue-i18n'
import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { LanguagesState } from './state'
import { Language } from './types'

type LanguageGetters = {
  getLanguage (state: LanguagesState): Language
  getLangShort (state: LanguagesState): string
  getMessages (state: LanguagesState): LocaleMessages<VueMessageType>
}

const getters: GetterTree<LanguagesState, RootState> & LanguageGetters = {
  getLanguage: (state: LanguagesState): Language => state.Languages.get(state.CurLang) as Language,
  getLangShort: (state: LanguagesState): string => state.CurLang,
  getMessages: (state: LanguagesState): LocaleMessages<VueMessageType> => state.Messages as LocaleMessages<VueMessageType>
}

export { LanguageGetters, getters }
