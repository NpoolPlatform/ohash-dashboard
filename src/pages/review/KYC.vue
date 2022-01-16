<template>
  <q-table
    flat
    dense
    :loading='kycReviewsLoading'
    :rows='kycReviews'
  >
    <template #top-right>
      <div class='row'>
        <q-space />
        <ApplicationSelector v-model:selected-app-id='selectedAppID' />
      </div>
    </template>
  </q-table>
  <div>{{ kycReviews }}</div>
</template>

<script setup lang='ts'>
import { onMounted, onUnmounted, defineAsyncComponent, computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { useStore } from '../../store'
import { ActionTypes as ApplicationActionTypes } from '../../store/applications/action-types'
import { ModuleKey, Type as NotificationType } from '../../store/notifications/const'
import { MutationTypes as ReviewMutationTypes } from '../../store/reviews/mutation-types'
import { MutationTypes as ApplicationMutationTypes } from '../../store/applications/mutation-types'
import { ActionTypes as ReviewActionTypes } from '../../store/reviews/action-types'
import { Review } from '../../store/reviews/types'
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
    store.commit(ReviewMutationTypes.SetKYCSelectedAppID, val)
  }
})

const kycReviews = computed(() => {
  const reviews = [] as Array<Review>
  store.getters.getKYCReviews.forEach((review) => {
    reviews.push(review.Review)
  })
  return reviews
})
const kycReviewsLoading = ref(false)

const unsubscribe = ref<FunctionVoid>()

onMounted(() => {
  kycReviewsLoading.value = true
  store.dispatch(ApplicationActionTypes.GetApplications, {
    Message: {
      ModuleKey: ModuleKey.ModuleReviews,
      Error: {
        Title: t('MSG_GET_APPLICATIONS_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })

  unsubscribe.value = store.subscribe((mutation) => {
    if (mutation.type === ReviewMutationTypes.SetKYCSelectedAppID) {
      kycReviewsLoading.value = true
      store.dispatch(ReviewActionTypes.GetKYCReviews, {
        AppID: selectedAppID.value,
        Message: {
          ModuleKey: ModuleKey.ModuleReviews,
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
      const notification = store.getters.peekNotification(ModuleKey.ModuleReviews)
      if (notification) {
        notify(notification)
        store.commit(NotificationMutationTypes.Pop, notificationPop(notification))
      }
    }

    if (mutation.type === ApplicationMutationTypes.SetApplications) {
      kycReviewsLoading.value = false
    }

    if (mutation.type === ReviewMutationTypes.SetKYCReviews) {
      kycReviewsLoading.value = false
    }
  })
})

onUnmounted(() => {
  unsubscribe.value?.()
})

</script>
