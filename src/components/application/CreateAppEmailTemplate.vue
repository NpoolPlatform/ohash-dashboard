<template>
  <q-card class='container'>
    <q-card-section>
      <q-item-label>{{ $t('MSG_CREATE_APP_EMAIL_TEMPLATE') }}</q-item-label>
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
      <q-input
        v-model='replyTos'
        :label='$t("MSG_REPLY_TO")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <q-input
        v-model='ccTos'
        :label='$t("MSG_CC_TO")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <q-input
        v-model='template.Subject'
        :label='$t("MSG_SUBJECT")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <q-input
        v-model='template.Body'
        :label='$t("MSG_BODY")'
        type='textarea'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <q-input
        v-model='template.UsedFor'
        :label='$t("MSG_USED_FOR")'
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
import { ref, defineProps, toRef, computed, defineEmits, watch, onMounted } from 'vue'
import { Application } from 'src/store/applications/types'
import { AppEmailTemplate } from 'src/store/appemailtemplates/types'
import { useStore } from 'src/store'
import { Language } from 'src/store/languages/types'
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

const replyTos = ref('')
const ccTos = ref('')

const template = computed(() => {
  return {
    AppID: selectedApp.value?.App.ID,
    LangID: selectedLangID.value,
    ReplyTos: replyTos.value.split(','),
    CCTos: ccTos.value.split(',')
  } as AppEmailTemplate
})

watch(template, () => {
  emit('update', template.value)
})

const emit = defineEmits<{(e: 'submit', info: AppEmailTemplate): void,
  (e: 'update', info: AppEmailTemplate): void
}>()

const onSubmit = () => {
  emit('submit', template.value)
}

const onLangItemClick = (lang: Language) => {
  selectedLang.value = lang
}

onMounted(() => {
  store.dispatch(ActionTypes.GetAppLangInfos, {
    AppID: selectedApp.value?.App.ID as string,
    Message: {
      ModuleKey: ModuleKey.ModuleApplications,
      Error: {
        Title: t('MSG_GET_APP_LANG_INFOS_FAIL'),
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
