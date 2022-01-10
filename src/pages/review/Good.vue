<template>
  <q-table
    flat
    dense
    :loading='goodReviewsLoading'
    :rows='goodReviews'
  />
</template>

<script setup lang='ts'>
import { onMounted, onUnmounted, computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { useStore } from '../../store'
import { ActionTypes as ApplicationActionTypes } from '../../store/applications/action-types'
import { ModuleKey, Type as NotificationType } from '../../store/notifications/const'
import { MutationTypes as KYCMutationTypes } from '../../store/kycs/mutation-types'
import { MutationTypes as ApplicationMutationTypes } from '../../store/applications/mutation-types'
import { ActionTypes as KYCActionTypes } from '../../store/kycs/action-types'
import { FunctionVoid } from '../../types/types'
import { MutationTypes as NotificationMutationTypes } from '../../store/notifications/mutation-types'
import { notify, notificationPop } from '../../store/notifications/helper'

const store = useStore()
// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const selectedAppID = computed({
  get: () => store.getters.getKYCSelectedAppID,
  set: (val) => {
    store.commit(KYCMutationTypes.SetKYCSelectedAppID, val)
  }
})

const goodReviews = computed(() => store.getters.getKYCReviews)
const goodReviewsLoading = ref(false)

const unsubscribe = ref<FunctionVoid>()

onMounted(() => {
  goodReviewsLoading.value = true
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
      goodReviewsLoading.value = true
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
      goodReviewsLoading.value = false
      const notification = store.getters.peekNotification(ModuleKey.ModuleKYCs)
      if (notification) {
        notify(notification)
        store.commit(NotificationMutationTypes.Pop, notificationPop(notification))
      }
    }

    if (mutation.type === ApplicationMutationTypes.SetApplications) {
      goodReviewsLoading.value = false
    }
  })
})

onUnmounted(() => {
  unsubscribe.value?.()
})

</script>
