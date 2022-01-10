<template>
  <div class='row'>
    <q-space />
    <ApplicationSelector v-model:selected-app-id='selectedAppID' />
  </div>
  <q-table
    flat
    dense
    :loading='kycReviewsLoading'
    :rows='kycReviews'
  />
</template>

<script setup lang='ts'>
import { onMounted, onUnmounted, defineAsyncComponent, computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { useStore } from '../../store'
import { ActionTypes as ApplicationActionTypes } from '../../store/applications/action-types'
import { ModuleKey, Type as NotificationType } from '../../store/notifications/const'
import { MutationTypes as KYCMutationTypes } from '../../store/kycs/mutation-types'
import { ActionTypes as KYCActionTypes } from '../../store/kycs/action-types'
import { FunctionVoid } from '../../types/types'
import { MutationTypes as NotificationMutationTypes } from '../../store/notifications/mutation-types'
import { notify, notificationPop } from '../../store/notifications/helper'

const store = useStore()
// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const ApplicationSelector = defineAsyncComponent(() => import('src/components/dropdown/ApplicationSelector.vue'))

const selectedAppID = computed({
  get: () => store.getters.getKYCSelectedAppID,
  set: (val) => {
    store.commit(KYCMutationTypes.SetKYCSelectedAppID, val)
  }
})

const kycReviews = computed(() => store.getters.getKYCReviews)
const kycReviewsLoading = ref(false)

const unsubscribe = ref<FunctionVoid>()

onMounted(() => {
  store.dispatch(ApplicationActionTypes.GetApplications, {
    Message: {
      ModuleKey: ModuleKey.ModuleKYCs,
      Error: {
        Title: t('MSG_GET_APPLICATIONS_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })

  unsubscribe.value = store.subscribe((mutation) => {
    if (mutation.type === KYCMutationTypes.SetKYCSelectedAppID) {
      kycReviewsLoading.value = true
      store.dispatch(KYCActionTypes.GetKYCReviews, {
        AppID: selectedAppID.value,
        Message: {
          ModuleKey: ModuleKey.ModuleKYCs,
          Error: {
            Title: t('MSG_GET_KYC_REVIEWS_FAIL'),
            Popup: true,
            Type: NotificationType.Error
          }
        }
      })
    }

    if (mutation.type === NotificationMutationTypes.Push) {
      kycReviewsLoading.value = false
      const notification = store.getters.peekNotification(ModuleKey.ModuleKYCs)
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

</script>
