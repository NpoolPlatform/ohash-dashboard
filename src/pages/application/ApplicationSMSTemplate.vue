<template>
  <q-table
    flat
    dense
    :loading='loading'
    :rows='templates'
    @row-click='(evt, row, index) => onRowClick(row as AppSMSTemplate)'
  >
    <template #top-right>
      <div class='row'>
        <q-space />
        <q-btn dense @click='onCreateAppSMSTemplateClick'>
          {{ $t('MSG_CREATE_APP_SMS_TEMPLATE') }}
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
    @hide='onMenuHide'
  >
    <CreateAppSMSTemplate
      v-model:edit-template='selectedTemplate'
      @update='onUpdate'
      @submit='onSubmit'
    />
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
import { MutationTypes as AppSMSTemplateMutationTypes } from 'src/store/appsmstemplates/mutation-types'
import { ActionTypes as AppSMSTemplateActionTypes } from 'src/store/appsmstemplates/action-types'
import { AppSMSTemplate } from 'src/store/appsmstemplates/types'

const CreateAppSMSTemplate = defineAsyncComponent(() => import('src/components/application/CreateAppSMSTemplate.vue'))

const store = useStore()
// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const loading = ref(true)
const adding = ref(false)
const updating = ref(false)
const modifying = ref(false)

const templates = computed(() => store.getters.getAppSMSTemplates)

const selectedTemplate = ref()

const onRowClick = (row: AppSMSTemplate) => {
  selectedTemplate.value = row
  updating.value = true
  modifying.value = true
}

const onCreateAppSMSTemplateClick = () => {
  selectedTemplate.value = undefined
  adding.value = true
  modifying.value = true
}

const onUpdate = (template: AppSMSTemplate) => {
  // TODO: fileter the list
  console.log('update', template)
}

const onSubmit = (template: AppSMSTemplate) => {
  let action = AppSMSTemplateActionTypes.CreateAppSMSTemplate
  if (updating.value) {
    action = AppSMSTemplateActionTypes.UpdateAppSMSTemplate
  }

  adding.value = false
  updating.value = false
  modifying.value = false

  store.dispatch(action, {
    Info: template,
    Message: {
      ModuleKey: ModuleKey.ModuleApplication,
      Error: {
        Title: t('MSG_CREATE_APP_SMS_TEMPLATE_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })
}

const unsubscribe = ref<FunctionVoid>()

onMounted(() => {
  store.dispatch(AppSMSTemplateActionTypes.GetAppSMSTemplates, {
    Message: {
      ModuleKey: ModuleKey.ModuleApplication,
      Error: {
        Title: t('MSG_GET_APP_SMS_TEMPLATES_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })
  unsubscribe.value = store.subscribe((mutation) => {
    if (mutation.type === AppSMSTemplateMutationTypes.SetAppSMSTemplates) {
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
  modifying.value = false
}

</script>
