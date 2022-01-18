/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { boot } from 'quasar/wrappers'
import { MutationTypes as LangMutationTypes } from 'src/store/languages/mutation-types'
import { createI18n, LocaleMessages, VueMessageType } from 'vue-i18n'

import { Store } from '../store'

export default boot(({ app, store }) => {
  const myStore = store as Store
  const i18n = createI18n({
    locale: myStore.getters.getLangShort,
    messages: myStore.getters.getMessages
  })

  myStore.subscribe((mutation) => {
    if (mutation.type === LangMutationTypes.SetLangShort) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      i18n.global.locale = mutation.payload
    }
    if (mutation.type === LangMutationTypes.SetMessages) {
      const messages = mutation.payload as LocaleMessages<VueMessageType>
      Object.keys(messages).forEach((key) => {
        i18n.global.setLocaleMessage(key, messages[key])
      })
    }
  })

  // Set i18n instance on app
  app.use(i18n)
})
