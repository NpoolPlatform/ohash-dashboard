<script setup lang='ts'>
import { onMounted } from 'vue'

import { useStore } from 'src/store'
import { MutationTypes as LangMutationTypes } from 'src/store/languages/mutation-types'
import messages from 'src/i18n'
import { DefaultID } from 'src/const/const'

const store = useStore()

onMounted(() => {
  store.commit(LangMutationTypes.SetLanguage, {
    ID: DefaultID,
    Lang: 'en-US',
    Logo: '',
    Name: 'English',
    Short: 'en-US'
  })
  store.commit(LangMutationTypes.SetLangShort, 'en-US')
  store.commit(LangMutationTypes.SetMessages, messages)
})

</script>
