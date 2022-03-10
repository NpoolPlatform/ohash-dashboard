<template>
  <q-table
    v-model:selected='selectedPayments'
    flat
    dense
    :loading='loading'
    :rows='payments'
    selection='multiple'
  />
  <q-table
    flat
    dense
    :rows='coins'
  />
  <q-table
    flat
    dense
    :rows='balances'
  />
</template>

<script setup lang='ts'>
import { onMounted, onUnmounted, computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { useStore } from '../../store'
import { ModuleKey, Type as NotificationType } from '../../store/notifications/const'
import { ActionTypes as BillingActionTypes } from '../../store/billing/action-types'
import { MutationTypes as BillingMutationTypes } from '../../store/billing/mutation-types'
import { FunctionVoid } from '../../types/types'
import { MutationTypes as NotificationMutationTypes } from '../../store/notifications/mutation-types'
import { notify, notificationPop } from '../../store/notifications/helper'
import { ActionTypes as CoinActionTypes } from 'src/store/coins/action-types'
import { Payment } from 'src/store/billing/types'

const store = useStore()
// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const coins = computed(() => store.getters.getCoins)
const balances = computed(() => store.getters.getUserPaymentBalances)
const payments = computed(() => store.getters.getPayments)
const selectedPayments = ref([] as Array<Payment>)

const loading = ref(false)
const unsubscribe = ref<FunctionVoid>()

onMounted(() => {
  loading.value = true
  store.dispatch(BillingActionTypes.GetPayments, {
    Message: {
      ModuleKey: ModuleKey.ModuleReviews,
      Error: {
        Title: t('MSG_GET_PAYMENTS_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })

  store.dispatch(CoinActionTypes.GetCoins, {
    Message: {
      ModuleKey: ModuleKey.ModuleGoods,
      Error: {
        Title: t('MSG_GET_COINS_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })

  store.dispatch(BillingActionTypes.GetUserPaymentBalances, {
    Message: {
      ModuleKey: ModuleKey.ModuleReviews,
      Error: {
        Title: t('MSG_GET_USER_PAYMENT_BALANCES_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })

  unsubscribe.value = store.subscribe((mutation) => {
    if (mutation.type === NotificationMutationTypes.Push) {
      loading.value = false
      const notification = store.getters.peekNotification(ModuleKey.ModuleReviews)
      if (notification) {
        notify(notification)
        store.commit(NotificationMutationTypes.Pop, notificationPop(notification))
      }
    }

    if (mutation.type === BillingMutationTypes.SetPayments) {
      loading.value = false
    }
  })
})

onUnmounted(() => {
  unsubscribe.value?.()
})

</script>
