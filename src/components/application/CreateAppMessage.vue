<template>
  <q-card class='container'>
    <q-card-section>
      <q-item-label>{{ $t('MSG_CREATE_APP_EMAIL_TEMPLATE') }}</q-item-label>
    </q-card-section>
    <q-item-section>
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
        v-model='myMessageID'
        :label='$t("MSG_MESSAGE_ID")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <q-input
        v-model='myMessage'
        :label='$t("MSG_MESSAGE")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <q-toggle
        v-model='batchGet'
        :label='$t("MSG_BATCH_GET")'
      />
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
import { defineProps, toRef, computed, defineEmits, watch, onMounted, ref } from 'vue'
import { useStore } from 'src/store'
import { Language, Message as LangMessage } from 'src/store/languages/types'
import { ActionTypes } from 'src/store/languages/action-types'
import { ModuleKey, Type as NotificationType } from 'src/store/notifications/const'
import { useI18n } from 'vue-i18n'

const store = useStore()

// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

interface Props {
  editMessage?: LangMessage
}

const props = defineProps<Props>()

const editMessage = toRef(props, 'editMessage')

const languages = computed(() => store.getters.getAppLangInfos)

const editTemplateLang = computed(() => {
  if (!editMessage.value) {
    return {} as Language
  }
  for (let i = 0; i < languages.value.length; i++) {
    if ((editMessage.value as unknown as LangMessage).LangID === languages.value[i].ID) {
      return languages.value[i]
    }
  }
  return {} as Language
})

const selectedLang = ref(editTemplateLang.value)
const selectedLangName = computed(() => selectedLang.value.Name)
const selectedLangID = computed(() => selectedLang.value.ID)

const editMyMessageID = computed(() => {
  return editMessage.value && editMessage.value.MessageID ? editMessage.value.MessageID : ''
})
const myMessageID = ref(editMyMessageID.value)

const editMyMessage = computed(() => {
  return editMessage.value && editMessage.value.Message ? editMessage.value.Message : ''
})
const myMessage = ref(editMyMessage.value)

const editBatchGet = computed(() => {
  return editMessage.value && editMessage.value.BatchGet ? editMessage.value.BatchGet : false
})
const batchGet = ref(editBatchGet.value)

const editMessageID = computed(() => {
  return editMessage.value ? editMessage.value.ID : undefined
})
const id = ref(editMessageID.value)

const message = computed(() => {
  return {
    ID: id.value as string,
    LangID: selectedLangID.value,
    MessageID: myMessageID.value,
    Message: myMessage.value,
    BatchGet: batchGet.value
  } as LangMessage
})

watch(message, () => {
  emit('update', message.value)
})

const emit = defineEmits<{(e: 'submit', info: LangMessage): void,
  (e: 'update', info: LangMessage): void
}>()

const onSubmit = () => {
  emit('submit', message.value)
}

const onLangItemClick = (lang: Language) => {
  selectedLang.value = lang
}

onMounted(() => {
  store.dispatch(ActionTypes.GetAppLangInfos, {
    Message: {
      ModuleKey: ModuleKey.ModuleApplication,
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
