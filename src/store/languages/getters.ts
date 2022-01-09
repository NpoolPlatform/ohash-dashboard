import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { LanguagesState } from './state'
import { Language } from './types'

type LanguageGetters = {
  getLanguage (state: LanguagesState): Language
}

const getters: GetterTree<LanguagesState, RootState> & LanguageGetters = {
  getLanguage: (state: LanguagesState): Language => state.Languages.get(state.CurLang) as Language
}

export { LanguageGetters, getters }
