<template>
  <q-card class='container'>
    <q-card-section>
      <q-item-label>{{ $t('MSG_ADD_LANGUAGE') }}</q-item-label>
    </q-card-section>
    <q-item-section>
      <q-input
        v-model='language.Lang'
        :label='$t("MSG_SPEC")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <q-input
        v-model='language.Name'
        :label='$t("MSG_FULLNAME")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <q-input
        v-model='language.Short'
        :label='$t("MSG_SHORT")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <q-input
        v-model='language.Logo'
        :label='$t("MSG_LOGO")'
        type='textarea'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
    </q-item-section>
    <q-item-section>
      <q-btn
        class='submit-btn'
        :label='$t("MSG_SUBMIT")'
        @click='onSubmit'
      />
    </q-item-section>
  </q-card>
</template>

<script setup lang='ts'>
import { ref, defineEmits, watch, onMounted } from 'vue'
import { useStore } from 'src/store'
import { Language } from 'src/store/languages/types'
import { ActionTypes } from 'src/store/languages/action-types'
import { ModuleKey, Type as NotificationType } from 'src/store/notifications/const'
import { useI18n } from 'vue-i18n'

const store = useStore()

// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const language = ref({} as Language)

const emit = defineEmits<{(e: 'submit', info: Language): void,
  (e: 'update', info: Language): void
}>()

watch(language, () => {
  emit('update', language.value)
})

const onSubmit = () => {
  emit('submit', language.value)
}

onMounted(() => {
  store.dispatch(ActionTypes.GetLanguages, {
    Message: {
      ModuleKey: ModuleKey.ModuleInternationalization,
      Error: {
        Title: t('MSG_GET_LANGUAGES_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })
})

</script>

<style lang='sass' scoped>
.container
  padding: 24px
  min-width: 800px

.submit-btn
  margin-top: 24px
  background-color: $blue-6
  color: white
</style>
