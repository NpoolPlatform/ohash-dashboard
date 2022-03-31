<template>
  <q-table
    flat
    dense
    :rows='languages'
  />
  <q-table
    v-model:selected='selectedLang'
    row-key='ID'
    flat
    dense
    :loading='loading'
    :rows='appLanguages'
    selection='single'
  >
    <template #top-right>
      <div class='row'>
        <q-space />
        <q-btn dense @click='onAddAppLanguage'>
          {{ $t('MSG_ADD_LANGUAGE') }}
        </q-btn>
      </div>
    </template>
  </q-table>
  <q-table
    flat
    dense
    :loading='loading'
    :rows='messages'
    @row-click='(evt, row, index) => onMessageClick(row as Message)'
  >
    <template #top-right>
      <div class='row'>
        <q-space />
        <q-btn dense @click='onCreateMessage'>
          {{ $t('MSG_CREATE') }}
        </q-btn>
      </div>
    </template>
  </q-table>
  <q-dialog
    v-model='adding'
    position='right'
    full-width
    square
    no-shake
    @hide='onMenuHide'
  >
    <CreateAppLanguage
      v-if='addingType === AddingType.AddingAppLang'
      @update='onUpdateAppLang'
      @submit='onSubmitAppLang'
    />
    <CreateAppMessage
      v-if='addingType === AddingType.AddingMessage'
      :edit-message='editMessage'
      @update='onUpdateMessage'
      @submit='onSubmitMessage'
    />
  </q-dialog>
</template>

<script setup lang='ts'>
import { onMounted, ref, computed, defineAsyncComponent, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import { useStore } from 'src/store'
import { ModuleKey, Type as NotificationType } from 'src/store/notifications/const'
import { MutationTypes as NotificationMutationTypes } from 'src/store/notifications/mutation-types'
import { notify, notificationPop } from 'src/store/notifications/helper'
import { FunctionVoid } from 'src/types/types'
import { ActionTypes as LangActionTypes } from 'src/store/languages/action-types'
import { MutationTypes as LangMutationTypes } from 'src/store/languages/mutation-types'
import { AppLanguage, Language, Message } from 'src/store/languages/types'

const CreateAppLanguage = defineAsyncComponent(() => import('src/components/application/CreateAppLanguage.vue'))
const CreateAppMessage = defineAsyncComponent(() => import('src/components/application/CreateAppMessage.vue'))

const store = useStore()
// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const loading = ref(true)
const updating = ref(false)

enum AddingType {
  AddingAppLang = 'app-lang',
  AddingMessage = 'message',
  AddingNone = 'none'
}

const adding = ref(false)
const addingType = ref(AddingType.AddingNone)

const languages = computed(() => store.getters.getLanguages)
const appLanguages = computed(() => store.getters.getAppLangInfos)
const selectedLang = ref([] as Array<Language>)
const messages = computed(() => store.getters.getLangMessages(selectedLang.value[0]?.ID))

watch(selectedLang, () => {
  store.dispatch(LangActionTypes.GetMessagesByLang, {
    LangID: selectedLang.value[0]?.ID,
    Message: {
      ModuleKey: ModuleKey.ModuleInternationalization,
      Error: {
        Title: t('MSG_GET_MESSAGES_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })
})

const onAddAppLanguage = () => {
  adding.value = true
  addingType.value = AddingType.AddingAppLang
}

const onUpdateAppLang = (appLanguage: AppLanguage) => {
  // TODO: fileter the list
  console.log('update', appLanguage)
}

const onSubmitAppLang = (appLanguage: AppLanguage) => {
  adding.value = false
  store.dispatch(LangActionTypes.CreateAppLanguage, {
    Info: appLanguage,
    Message: {
      ModuleKey: ModuleKey.ModuleApplication,
      Error: {
        Title: t('MSG_CREATE_APP_LANG_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })
}

const onCreateMessage = () => {
  adding.value = true
  addingType.value = AddingType.AddingMessage
}

const editMessage = ref(undefined as unknown as Message)
const onMessageClick = (message: Message) => {
  editMessage.value = message
  updating.value = true
  adding.value = true
  addingType.value = AddingType.AddingMessage
}

const onUpdateMessage = (message: Message) => {
  // TODO: fileter the list
  console.log('update', message)
}

const onSubmitMessage = (message: Message) => {
  adding.value = false

  let action = LangActionTypes.CreateMessage
  if (updating.value) {
    action = LangActionTypes.UpdateMessage
  }

  store.dispatch(action, {
    Info: message,
    Message: {
      ModuleKey: ModuleKey.ModuleApplication,
      Error: {
        Title: t('MSG_CREATE_MESSAGE_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })
}

const unsubscribe = ref<FunctionVoid>()

onMounted(() => {
  store.dispatch(LangActionTypes.GetLanguages, {
    Message: {
      ModuleKey: ModuleKey.ModuleInternationalization,
      Error: {
        Title: t('MSG_GET_LANGUAGES_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })

  store.dispatch(LangActionTypes.GetAppLangInfos, {
    Message: {
      ModuleKey: ModuleKey.ModuleApplication,
      Error: {
        Title: t('MSG_GET_APP_LANG_INFOS_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })

  unsubscribe.value = store.subscribe((mutation) => {
    if (mutation.type === LangMutationTypes.SetAppLangInfos) {
      loading.value = false
    }

    if (mutation.type === NotificationMutationTypes.Push) {
      const notification = store.getters.peekNotification(ModuleKey.ModuleApplication)
      if (notification) {
        notify(notification)
        store.commit(NotificationMutationTypes.Pop, notificationPop(notification))
      }
    }
  })
})

const onMenuHide = () => {
  adding.value = false
  updating.value = false
  addingType.value = AddingType.AddingNone
  editMessage.value = undefined as unknown as Message
}

</script>
