<template>
  <q-table
    flat
    dense
    :loading='loading'
    :rows='contacts'
    @row-click='(evt, row, index) => onRowClick(row as AppContact)'
  >
    <template #top-right>
      <div class='row'>
        <q-space />
        <q-btn dense @click='onCreateAppContactClick'>
          {{ $t('MSG_CREATE_APP_CONTACT') }}
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
    <CreateAppContact
      v-model:edit-contact='selectedContact'
      @update='onUpdate'
      @submit='onSubmit'
    />
  </q-dialog>
</template>

<script setup lang='ts'>
import { onMounted, ref, computed, defineAsyncComponent, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

import { useStore } from 'src/store'
import { ModuleKey, Type as NotificationType } from 'src/store/notifications/const'
import { MutationTypes as NotificationMutationTypes } from 'src/store/notifications/mutation-types'
import { notify, notificationPop } from 'src/store/notifications/helper'
import { FunctionVoid } from 'src/types/types'
import { MutationTypes as AppContactMutationTypes } from 'src/store/appcontacts/mutation-types'
import { ActionTypes as AppContactActionTypes } from 'src/store/appcontacts/action-types'
import { AppContact } from 'src/store/appcontacts/types'

const CreateAppContact = defineAsyncComponent(() => import('src/components/application/CreateAppContact.vue'))

const store = useStore()
// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const loading = ref(true)
const adding = ref(false)
const updating = ref(false)
const modifying = ref(false)

const contacts = computed(() => store.getters.getAppContacts)

const selectedContact = ref()

const onRowClick = (row: AppContact) => {
  selectedContact.value = row
  updating.value = true
  modifying.value = true
}

const onCreateAppContactClick = () => {
  selectedContact.value = undefined
  adding.value = true
  modifying.value = true
}

const onUpdate = (contact: AppContact) => {
  // TODO: fileter the list
  console.log('update', contact)
}

const onSubmit = (contact: AppContact) => {
  let action = AppContactActionTypes.CreateAppContact
  if (updating.value) {
    action = AppContactActionTypes.UpdateAppContact
  }

  adding.value = false
  updating.value = false
  modifying.value = false

  store.dispatch(action, {
    Info: contact,
    Message: {
      ModuleKey: ModuleKey.ModuleApplication,
      Error: {
        Title: t('MSG_CREATE_APP_CONTACT_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })
}

const unsubscribe = ref<FunctionVoid>()

onMounted(() => {
  store.dispatch(AppContactActionTypes.GetAppContacts, {
    Message: {
      ModuleKey: ModuleKey.ModuleApplication,
      Error: {
        Title: t('MSG_GET_APP_CONTACTS_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })

  unsubscribe.value = store.subscribe((mutation) => {
    if (mutation.type === AppContactMutationTypes.SetAppContacts) {
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

onUnmounted(() => {
  unsubscribe.value?.()
})

const onMenuHide = () => {
  adding.value = false
  updating.value = false
  modifying.value = false
}

</script>
