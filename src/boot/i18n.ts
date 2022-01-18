import { boot } from 'quasar/wrappers'
import { createI18n } from 'vue-i18n'

import { Store } from '../store'

export default boot(({ app, store }) => {
  const myStore = store as Store
  const i18n = createI18n({
    locale: myStore.getters.getLangShort,
    messages: myStore.getters.getMessages
  })

  // Set i18n instance on app
  app.use(i18n)
})
