<template>
  <q-table
    flat
    dense
    :loading='kycReviewsLoading'
    :rows='kycReviews'
    @row-click='(evt, row, index) => onRowClick(index)'
  />
  <q-dialog
    v-model='reviewing'
    position='right'
    full-width
    square
    no-shake
  >
    <KYC
      v-model:kyc-review='kycReview'
      @approve='onReviewApprove'
      @reject='onReviewReject'
    />
  </q-dialog>
</template>

<script setup lang='ts'>
import { onMounted, onUnmounted, defineAsyncComponent, computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { useStore } from '../../store'
import { ModuleKey, Type as NotificationType } from '../../store/notifications/const'
import { MutationTypes as ReviewMutationTypes } from '../../store/reviews/mutation-types'
import { ActionTypes as ReviewActionTypes } from '../../store/reviews/action-types'
import { KYCReview, Review } from '../../store/reviews/types'
import { FunctionVoid } from '../../types/types'
import { MutationTypes as NotificationMutationTypes } from '../../store/notifications/mutation-types'
import { notify, notificationPop } from '../../store/notifications/helper'
import { State } from '../../store/reviews/const'

const store = useStore()
// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const KYC = defineAsyncComponent(() => import('src/components/kyc/KYC.vue'))

const myReviews = computed(() => store.getters.getKYCReviews)
const kycReviews = computed(() => {
  const reviews = [] as Array<Review>
  myReviews.value.forEach((review) => {
    reviews.push(review.Review)
  })
  return reviews
})
const kycReviewsLoading = ref(false)

const unsubscribe = ref<FunctionVoid>()

onMounted(() => {
  kycReviewsLoading.value = true
  store.dispatch(ReviewActionTypes.GetKYCReviews, {
    Message: {
      ModuleKey: ModuleKey.ModuleReviews,
      Error: {
        Title: t('MSG_GET_KYC_REVIEWS_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })
  unsubscribe.value = store.subscribe((mutation) => {
    if (mutation.type === NotificationMutationTypes.Push) {
      kycReviewsLoading.value = false
      const notification = store.getters.peekNotification(ModuleKey.ModuleReviews)
      if (notification) {
        notify(notification)
        store.commit(NotificationMutationTypes.Pop, notificationPop(notification))
      }
    }

    if (mutation.type === ReviewMutationTypes.SetKYCReviews) {
      kycReviewsLoading.value = false
    }
  })
})

onUnmounted(() => {
  unsubscribe.value?.()
})

const reviewing = ref(false)
const selectedIndex = ref(0)
const kycReview = computed(() => {
  if (myReviews.value) {
    return myReviews.value[selectedIndex.value]
  }
  return {} as KYCReview
})

const onRowClick = (index: number) => {
  reviewing.value = true
  selectedIndex.value = index
}

const onReviewApprove = () => {
  reviewing.value = false
  store.dispatch(ReviewActionTypes.UpdateReview, {
    Info: {
      ID: kycReview.value?.Review.ID as string,
      ReviewerID: store.getters.getLoginedUser.User?.ID,
      State: State.Approved
    },
    Message: {
      ModuleKey: ModuleKey.ModuleReviews,
      Error: {
        Title: t('MSG_UPDATE_REVIEW_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })
}

const onReviewReject = (message: string) => {
  reviewing.value = false
  store.dispatch(ReviewActionTypes.UpdateReview, {
    Info: {
      ID: kycReview.value.Review.ID,
      ReviewerID: store.getters.getLoginedUser.User?.ID,
      State: State.Rejected,
      Message: message
    },
    Message: {
      ModuleKey: ModuleKey.ModuleReviews,
      Error: {
        Title: t('MSG_UPDATE_REVIEW_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })
}

</script>
