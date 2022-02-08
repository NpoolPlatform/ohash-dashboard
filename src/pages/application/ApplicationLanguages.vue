<template>
  <q-table
    flat
    dense
    :rows='languages'
  />
  <q-table
    flat
    dense
    :loading='loading'
    :rows='appLanguages'
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
  <q-dialog
    v-model='modifying'
    position='right'
    full-width
    square
    no-shake
  >
    <CreateAppLanguage @update='onUpdate' @submit='onSubmit' />
  </q-dialog>
</template>

<script setup lang='ts'>
import { onMounted, ref, computed, defineAsyncComponent } from 'vue'
import { useI18n } from 'vue-i18n'

import { useStore } from 'src/store'
import { ModuleKey, Type as NotificationType } from 'src/store/notifications/const'
import { MutationTypes as NotificationMutationTypes } from 'src/store/notifications/mutation-types'
import { notify, notificationPop } from 'src/store/notifications/helper'
import { FunctionVoid } from 'src/types/types'
import { ActionTypes as LangActionTypes } from 'src/store/languages/action-types'
import { MutationTypes as LangMutationTypes } from 'src/store/languages/mutation-types'
import { AppLanguage } from 'src/store/languages/types'

const CreateAppLanguage = defineAsyncComponent(() => import('src/components/application/CreateAppLanguage.vue'))

const store = useStore()
// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const loading = ref(true)
const modifying = ref(false)

const languages = computed(() => store.getters.getLanguages)
const appLanguages = computed(() => store.getters.getAppLangInfos)

const onAddAppLanguage = () => {
  modifying.value = true
}

const onUpdate = (appLanguage: AppLanguage) => {
  // TODO: fileter the list
  console.log('update', appLanguage)
}

const onSubmit = (appLanguage: AppLanguage) => {
  modifying.value = false
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

</script>
