import { LocaleMessages, VueMessageType } from 'vue-i18n'
import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { LanguagesState } from './state'
import { AppLangInfo, AppLanguage, Language, Message } from './types'

type LanguageMutations<S = LanguagesState> = {
  [MutationTypes.SetLanguage] (state: S, payload: Language): void
  [MutationTypes.SetLangShort] (state: S, payload: string): void
  [MutationTypes.SetMessages] (state: S, payload: unknown): void
  [MutationTypes.SetAppLangInfos] (state: S, payload: Array<AppLangInfo>): void
  [MutationTypes.SetAppLanguage] (state: S, payload: AppLanguage): void
  [MutationTypes.SetLangMessages] (state: S, payload: Array<Message>): void
  [MutationTypes.SetLangMessage] (state: S, payload: Message): void
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
    state.AppLangInfos = payload
  },
  [MutationTypes.SetAppLanguage] (state: LanguagesState, payload: AppLanguage) {
    let appLanguages = state.AppLanguages
    if (!appLanguages) {
      appLanguages = [] as Array<AppLanguage>
    }
    appLanguages?.push(payload)
    state.AppLanguages = appLanguages
  },
  [MutationTypes.SetLangMessages] (state: LanguagesState, payload: Array<Message>): void {
    if (payload.length > 0) {
      state.LangMessages.set(payload[0].LangID, payload)
    }
  },
  [MutationTypes.SetLangMessage] (state: LanguagesState, payload: Message): void {
    const messages = state.LangMessages.get(payload.LangID)
    if (!messages) {
      state.LangMessages.set(payload.LangID, [payload])
      return
    }

    for (let i = 0; i < messages.length; i++) {
      if (messages[i].ID === payload.ID) {
        messages.splice(i, 1, payload)
        state.LangMessages.set(payload.LangID, messages)
        return
      }
    }

    messages.splice(0, 0, payload)
    state.LangMessages.set(payload.LangID, messages)
  }
}

export { LanguageMutations, mutations }
