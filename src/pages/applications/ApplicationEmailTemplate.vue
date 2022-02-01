<template>
  <q-table
    flat
    dense
    :loading='loading'
    :rows='templates'
    @row-click='(evt, row, index) => onRowClick(index)'
  >
    <template #top-right>
      <div class='row'>
        <q-space />
        <q-btn dense @click='onCreateAppEmailTemplateClick'>{{ $t('MSG_CREATE_APP_EMAIL_TEMPLATE') }}</q-btn>
        <ApplicationSelector v-model:selected-app-id='selectedAppID' />
      </div>
    </template>
  </q-table>
  <q-dialog
    v-model='modifying'
    position='right'
    full-width
    square
    no-shake
  />
</template>

<script setup lang='ts'>
import { onMounted, ref, computed, defineAsyncComponent } from 'vue'
import { useI18n } from 'vue-i18n'

import { useStore } from 'src/store'
import { ActionTypes as ApplicationActionTypes } from 'src/store/applications/action-types'
import { ModuleKey, Type as NotificationType } from 'src/store/notifications/const'
import { MutationTypes as NotificationMutationTypes } from 'src/store/notifications/mutation-types'
import { notify, notificationPop } from 'src/store/notifications/helper'
import { FunctionVoid } from 'src/types/types'
import { MutationTypes as AppEmailTemplateMutationTypes } from 'src/store/appemailtemplates/mutation-types'
import { ActionTypes as AppEmailTemplateActionTypes } from 'src/store/appemailtemplates/action-types'

const ApplicationSelector = defineAsyncComponent(() => import('src/components/dropdown/ApplicationSelector.vue'))

const store = useStore()
// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const loading = ref(true)
const modifying = ref(false)

const selectedAppID = computed({
  get: () => store.getters.getAppEmailTemplateSelectedAppID,
  set: (val) => {
    store.commit(AppEmailTemplateMutationTypes.SetAppEmailTemplateSelectedAppID, val)
  }
})
const templates = computed(() => store.getters.getAppEmailTemplatesByApp(selectedAppID.value))

const onRowClick = (index: number) => {
  console.log('click', index)
}

const onCreateAppEmailTemplateClick = () => {
  console.log('clock', 'create app email template')
}

const unsubscribe = ref<FunctionVoid>()

onMounted(() => {
  store.dispatch(ApplicationActionTypes.GetApplications, {
    Message: {
      ModuleKey: ModuleKey.ModuleApplications,
      Error: {
        Title: t('MSG_GET_APPLICATIONS_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })

  unsubscribe.value = store.subscribe((mutation) => {
    if (mutation.type === AppEmailTemplateMutationTypes.SetAppEmailTemplateSelectedAppID) {
      store.dispatch(AppEmailTemplateActionTypes.GetAppEmailTemplatesByApp, {
        AppID: selectedAppID.value,
        Message: {
          ModuleKey: ModuleKey.ModuleApplications,
          Error: {
            Title: t('MSG_GET_APP_EMAIL_TEMPLATES_FAIL'),
            Popup: true,
            Type: NotificationType.Error
          }
        }
      })
    }

    if (mutation.type === AppEmailTemplateMutationTypes.SetAppEmailTemplatesByApp) {
      loading.value = false
    }

    if (mutation.type === NotificationMutationTypes.Push) {
      const notification = store.getters.peekNotification(ModuleKey.ModuleApplications)
      if (notification) {
        notify(notification)
        store.commit(NotificationMutationTypes.Pop, notificationPop(notification))
      }
    }
  })
})

</script>
