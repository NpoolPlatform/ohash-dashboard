<template>
  <ApplicationSelector v-model:selected-app-id='selectedAppID' />
  <div>{{ selectedAppID }}</div>
</template>

<script setup lang='ts'>
import { onMounted, defineAsyncComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { useStore } from 'src/store'
import { ActionTypes as ApplicationActionTypes } from 'src/store/applications/action-types'
import { ModuleKey, Type as NotificationType } from 'src/store/notifications/const'
import { AppID } from 'src/const/const'

const store = useStore()
// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const ApplicationSelector = defineAsyncComponent(() => import('src/components/dropdown/ApplicationSelector.vue'))

const selectedAppID = ref(AppID)

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
})

</script>
