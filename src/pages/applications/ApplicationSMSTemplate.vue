<template>
  <q-table
    flat
    dense
    :loading='loading'
    :rows='myTemplates'
    @row-click='(evt, row, index) => onRowClick(row as AppSMSTemplate)'
  >
    <template #top-right>
      <div class='row'>
        <q-space />
        <q-btn dense @click='onCreateAppSMSTemplateClick'>
          {{ $t('MSG_CREATE_APP_SMS_TEMPLATE') }}
        </q-btn>
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
    @hide='onMenuHide'
  >
    <CreateAppSMSTemplate
      v-model:edit-template='selectedTemplate'
      v-model:selected-app='selectedApp'
      @update='onUpdate'
      @submit='onSubmit'
    />
  </q-dialog>
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
import { MutationTypes as AppSMSTemplateMutationTypes } from 'src/store/appsmstemplates/mutation-types'
import { ActionTypes as AppSMSTemplateActionTypes } from 'src/store/appsmstemplates/action-types'
import { AppSMSTemplate } from 'src/store/appsmstemplates/types'

const ApplicationSelector = defineAsyncComponent(() => import('src/components/dropdown/ApplicationSelector.vue'))
const CreateAppSMSTemplate = defineAsyncComponent(() => import('src/components/application/CreateAppSMSTemplate.vue'))

const store = useStore()
// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const loading = ref(true)
const adding = ref(false)
const updating = ref(false)
const modifying = ref(false)

const selectedAppID = computed({
  get: () => store.getters.getAppSMSTemplateSelectedAppID,
  set: (val) => {
    store.commit(AppSMSTemplateMutationTypes.SetAppSMSTemplateSelectedAppID, val)
  }
})
const selectedApp = computed(() => store.getters.getApplicationByID(selectedAppID.value))
const templates = computed(() => store.getters.getAppSMSTemplatesByApp(selectedAppID.value))

const selectedTemplate = ref()

interface MyTemplate {
  ID?: string
  AppID: string
  LangID: string
  UsedFor: string
  Sender: string
  Subject: string
  Message: string
}
const myTemplates = computed(() => {
  if (!templates.value) {
    return [] as Array<MyTemplate>
  }
  const tmps = [] as Array<MyTemplate>
  templates.value.forEach(elem => {
    tmps.push({
      ID: elem.ID,
      AppID: elem.AppID,
      LangID: elem.LangID,
      UsedFor: elem.UsedFor,
      Subject: elem.Subject,
      Message: elem.Message
    } as MyTemplate)
  })
  return tmps
})

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
      ModuleKey: ModuleKey.ModuleApplications,
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
    if (mutation.type === AppSMSTemplateMutationTypes.SetAppSMSTemplateSelectedAppID) {
      store.dispatch(AppSMSTemplateActionTypes.GetAppSMSTemplatesByOtherApp, {
        TargetAppID: selectedAppID.value,
        Message: {
          ModuleKey: ModuleKey.ModuleApplications,
          Error: {
            Title: t('MSG_GET_APP_SMS_TEMPLATES_FAIL'),
            Popup: true,
            Type: NotificationType.Error
          }
        }
      })
    }

    if (mutation.type === AppSMSTemplateMutationTypes.SetAppSMSTemplatesByApp) {
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

const onMenuHide = () => {
  adding.value = false
  updating.value = false
  modifying.value = false
}

</script>
