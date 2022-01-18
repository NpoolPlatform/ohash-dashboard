import { boot } from 'quasar/wrappers'
import { createI18n } from 'vue-i18n'

import { Store } from '../store'
import { MutationTypes as LangMutationTypes } from 'src/store/languages/mutation-types'

import messages from 'src/i18n'

export default boot(({ app, store }) => {
  const i18n = createI18n({
    locale: 'en-US',
    messages
  })

  const myStore = store as Store
  myStore.subscribe((mutation) => {
    if (mutation.type === LangMutationTypes.SetMessages) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      i18n.global.messages['en-US'] = mutation.payload
    }
    if (mutation.type === LangMutationTypes.SetLangShort) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      i18n.global.locale = mutation.payload
    }
  })

  // Set i18n instance on app
  app.use(i18n)
})
