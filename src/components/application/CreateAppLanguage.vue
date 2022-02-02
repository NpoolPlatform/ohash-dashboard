<template>
  <q-card class='container'>
    <q-card-section>
      <q-item-label>{{ $t('MSG_ADD_LANGUAGE') }}</q-item-label>
    </q-card-section>
    <q-item-section>
      <q-item>
        <q-item-label>{{ $t('MSG_APP_NAME') }}: {{ selectedApp?.App.Name }}</q-item-label>
      </q-item>
      <q-btn-dropdown
        dense
        split
        icon='window'
        no-caps
        align='left'
        :label='selectedLangName'
      >
        <q-list>
          <q-item
            v-for='lang in languages'
            :key='lang.ID'
            v-close-popup
            clickable
            @click='onLangItemClick(lang)'
          >
            <q-item-section avatar>
              <q-avatar :icon='lang.Logo' />
            </q-item-section>
            <q-item-label>{{ lang.Name }}</q-item-label>
          </q-item>
        </q-list>
      </q-btn-dropdown>
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
import { ref, defineProps, toRef, computed, defineEmits, watch, onMounted } from 'vue'
import { Application } from 'src/store/applications/types'
import { useStore } from 'src/store'
import { Language, AppLanguage } from 'src/store/languages/types'
import { ActionTypes } from 'src/store/languages/action-types'
import { ModuleKey, Type as NotificationType } from 'src/store/notifications/const'
import { useI18n } from 'vue-i18n'

const store = useStore()

// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

interface Props {
  selectedApp?: Application
}

const props = defineProps<Props>()

const selectedApp = toRef(props, 'selectedApp')
const languages = computed(() => store.getters.getLanguages)

const selectedLang = ref({} as Language)
const selectedLangName = computed(() => selectedLang.value.Name)
const selectedLangID = computed(() => selectedLang.value.ID)

const appLanguage = computed(() => {
  return {
    AppID: selectedApp.value?.App.ID,
    LangID: selectedLangID.value
  } as AppLanguage
})

watch(appLanguage, () => {
  emit('update', appLanguage.value)
})

const emit = defineEmits<{(e: 'submit', info: AppLanguage): void,
  (e: 'update', info: AppLanguage): void
}>()

const onSubmit = () => {
  emit('submit', appLanguage.value)
}

const onLangItemClick = (lang: Language) => {
  selectedLang.value = lang
}

onMounted(() => {
  store.dispatch(ActionTypes.GetLanguages, {
    Message: {
      ModuleKey: ModuleKey.ModuleApplications,
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
