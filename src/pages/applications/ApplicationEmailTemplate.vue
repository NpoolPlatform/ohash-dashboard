<template>
  <q-table
    flat
    dense
    :loading='loading'
    :rows='applications'
  />
</template>

<script setup lang='ts'>
import { onMounted, ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { useStore } from 'src/store'
import { ActionTypes as ApplicationActionTypes } from 'src/store/applications/action-types'
import { MutationTypes as ApplicationMutationTypes } from 'src/store/applications/mutation-types'
import { ModuleKey, Type as NotificationType } from 'src/store/notifications/const'
import { MutationTypes as NotificationMutationTypes } from 'src/store/notifications/mutation-types'
import { notify, notificationPop } from 'src/store/notifications/helper'
import { FunctionVoid } from 'src/types/types'

const store = useStore()
// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const applications = computed(() => store.getters.getApplications)
const loading = ref(true)

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
    if (mutation.type === ApplicationMutationTypes.SetApplications) {
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
