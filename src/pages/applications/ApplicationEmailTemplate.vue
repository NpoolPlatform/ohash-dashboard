<template>
  <q-table
    flat
    dense
    :loading='loading'
    :rows='myTemplates'
    @row-click='(evt, row, index) => onRowClick(row as AppEmailTemplate)'
  >
    <template #top-right>
      <div class='row'>
        <q-space />
        <q-btn dense @click='onCreateAppEmailTemplateClick'>
          {{ $t('MSG_CREATE_APP_EMAIL_TEMPLATE') }}
        </q-btn>
        <ApplicationSelector v-model:selected-app-id='selectedAppID' />
      </div>
    </template>
  </q-table>
  <q-dialog
    v-model='modifing'
    position='right'
    full-width
    square
    no-shake
  >
    <CreateAppEmailTemplate
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
import { MutationTypes as AppEmailTemplateMutationTypes } from 'src/store/appemailtemplates/mutation-types'
import { ActionTypes as AppEmailTemplateActionTypes } from 'src/store/appemailtemplates/action-types'
import { AppEmailTemplate } from 'src/store/appemailtemplates/types'

const ApplicationSelector = defineAsyncComponent(() => import('src/components/dropdown/ApplicationSelector.vue'))
const CreateAppEmailTemplate = defineAsyncComponent(() => import('src/components/application/CreateAppEmailTemplate.vue'))

const store = useStore()
// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const loading = ref(true)
const adding = ref(false)
const updating = ref(false)
const modifing = ref(false)

const selectedAppID = computed({
  get: () => store.getters.getAppEmailTemplateSelectedAppID,
  set: (val) => {
    store.commit(AppEmailTemplateMutationTypes.SetAppEmailTemplateSelectedAppID, val)
  }
})
const selectedApp = computed(() => store.getters.getApplicationByID(selectedAppID.value))
const templates = computed(() => store.getters.getAppEmailTemplatesByApp(selectedAppID.value))

const selectedTemplate = ref()

interface MyTemplate {
  ID?: string
  AppID: string
  LangID: string
  UsedFor: string
  Sender: string
  Subject: string
  Body: string
  DefaultToUsername: string
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
      Sender: elem.Sender,
      Subject: elem.Subject,
      Body: elem.Body,
      DefaultToUsername: elem.DefaultToUsername
    } as MyTemplate)
  })
  return tmps
})

const onRowClick = (row: AppEmailTemplate) => {
  selectedTemplate.value = row
  updating.value = true
  modifing.value = true
}

const onCreateAppEmailTemplateClick = () => {
  selectedTemplate.value = undefined
  adding.value = true
  modifing.value = true
}

const onUpdate = (template: AppEmailTemplate) => {
  // TODO: fileter the list
  console.log('update', template)
}

const onSubmit = (template: AppEmailTemplate) => {
  let action = AppEmailTemplateActionTypes.CreateAppEmailTemplate
  if (updating.value) {
    action = AppEmailTemplateActionTypes.UpdateAppEmailTemplate
  }

  adding.value = false
  updating.value = false
  modifing.value = false

  store.dispatch(action, {
    Info: template,
    Message: {
      ModuleKey: ModuleKey.ModuleApplications,
      Error: {
        Title: t('MSG_CREATE_APP_EMAIL_TEMPLATE_FAIL'),
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
    if (mutation.type === AppEmailTemplateMutationTypes.SetAppEmailTemplateSelectedAppID) {
      store.dispatch(AppEmailTemplateActionTypes.GetAppEmailTemplatesByOtherApp, {
        TargetAppID: selectedAppID.value,
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
