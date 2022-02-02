import { LocaleMessages, VueMessageType } from 'vue-i18n'
import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { LanguagesState } from './state'
import { AppLangInfo, AppLanguage, Language } from './types'

type LanguageMutations<S = LanguagesState> = {
  [MutationTypes.SetLanguage] (state: S, payload: Language): void
  [MutationTypes.SetLangShort] (state: S, payload: string): void
  [MutationTypes.SetMessages] (state: S, payload: unknown): void
  [MutationTypes.SetAppLangInfos] (state: S, payload: Array<AppLangInfo>): void
  [MutationTypes.SetAppLanguage] (state: S, payload: AppLanguage): void
  [MutationTypes.SetSelectedAppID] (state: S, payload: string): void
}

const mutations: MutationTree<LanguagesState> & LanguageMutations = {
  [MutationTypes.SetLanguage] (state: LanguagesState, payload: Language) {
    state.Languages.set(payload.Lang, payload)
  },
  [MutationTypes.SetLangShort] (state: LanguagesState, payload: string) {
    state.CurLang = payload
  },
  [MutationTypes.SetMessages] (state: LanguagesState, payload: LocaleMessages<VueMessageType>) {
    state.Messages = payload
  },
  [MutationTypes.SetAppLangInfos] (state: LanguagesState, payload: Array<AppLangInfo>): void {
    if (payload.length > 0) {
      state.AppLangInfos.set(payload[0].AppLang.AppID, payload)
    }
  },
  [MutationTypes.SetAppLanguage] (state: LanguagesState, payload: AppLanguage) {
    const appLanguages = state.AppLanguages.get(payload.AppID)
    appLanguages?.push(payload)
    state.AppLanguages.set(payload.AppID, appLanguages as Array<AppLanguage>)
  },
  [MutationTypes.SetSelectedAppID] (state: LanguagesState, payload: string) {
    state.SelectedAppID = payload
  }
}

export { LanguageMutations, mutations }
