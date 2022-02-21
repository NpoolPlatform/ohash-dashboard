<template>
  <q-table
    v-model:selected='selectedGoods'
    flat
    dense
    row-key='ID'
    :rows='allGoods'
    selection='multiple'
  />
  <q-table
    v-model:selected='selectedAppGoods'
    row-key='ID'
    flat
    dense
    :loading='loading'
    :rows='appGoods'
    selection='multiple'
  >
    <template #top-right>
      <div class='row'>
        <q-space />
        <q-input v-model='goodPrice' dense flat :label='t("MSG_GOOD_PRICE")' />
        <q-btn dense @click='onSetGoodOnline'>
          {{ $t('MSG_SET_ONLINE') }}
        </q-btn>
        <q-btn dense @click='onSetGoodOffline'>
          {{ $t('MSG_SET_OFFLINE') }}
        </q-btn>
        <q-btn dense @click='onModifyPrice'>
          {{ $t('MSG_MODIFY_PRICE') }}
        </q-btn>
      </div>
    </template>
  </q-table>
  <q-table
    flat
    dense
    :loading='loading'
    :rows='recommends'
  >
    <template #top-right>
      <div class='row'>
        <q-space />
        <q-btn dense @click='onAddRecommend'>
          {{ $t('MSG_ADD') }}
        </q-btn>
      </div>
    </template>
  </q-table>
  <q-table
    v-model:selected='selectedCoin'
    flat
    dense
    row-key='ID'
    :loading='loading'
    :rows='coins'
    selection='single'
  />
  <q-table
    flat
    dense
    :loading='loading'
    :rows='settings'
  >
    <template #top-right>
      <div class='row'>
        <q-space />
        <q-btn dense @click='onCreateAppWithdrawSetting'>
          {{ mySetting ? $t('MSG_SUBMIT') : $t('MSG_CREATE') }}
        </q-btn>
      </div>
    </template>
    <template #body='props'>
      <q-tr :props='props'>
        <q-td key='ID' :props='props'>
          {{ props.row.ID }}
        </q-td>
        <q-td key='AppID' :props='props'>
          {{ props.row.AppID }}
        </q-td>
        <q-td key='CoinTypeID' :props='props'>
          {{ props.row.CoinTypeID }}
        </q-td>
        <q-td key='WithdrawAutoReviewCoinAmount' :props='props'>
          {{ withdrawAutoReviewCoinAmount }}
          <q-popup-edit v-slot='scope' v-model='withdrawAutoReviewCoinAmount' buttons persistent>
            <q-input
              v-model='scope.value' type='number'
              dense autofocus counter
            />
          </q-popup-edit>
        </q-td>
      </q-tr>
    </template>
  </q-table>
  <q-dialog
    v-model='modifying'
    position='right'
    full-width
    square
    no-shake
  >
    <CreateAppRecommendGood @update='onUpdate' @submit='onSubmit' />
  </q-dialog>
</template>

<script setup lang='ts'>
import { onMounted, ref, computed, defineAsyncComponent, onUnmounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import { useStore } from 'src/store'
import { ActionTypes as ApplicationActionTypes } from 'src/store/application/action-types'
import { ActionTypes as GoodActionTypes } from 'src/store/goods/action-types'
import { ModuleKey, Type as NotificationType } from 'src/store/notifications/const'
import { MutationTypes as NotificationMutationTypes } from 'src/store/notifications/mutation-types'
import { notify, notificationPop } from 'src/store/notifications/helper'
import { FunctionVoid } from 'src/types/types'
import { MutationTypes as ApplicationMutationTypes } from 'src/store/application/mutation-types'
import { GoodBase } from 'src/store/goods/types'
import { AppGood, AppWithdrawSetting, Recommend } from 'src/store/application/types'
import { ActionTypes as CoinActionTypes } from 'src/store/coins/action-types'
import { Coin } from 'src/store/coins/types'

const CreateAppRecommendGood = defineAsyncComponent(() => import('src/components/application/CreateAppRecommendGood.vue'))

const store = useStore()
// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const loading = ref(true)

const allGoods = computed(() => {
  const goods = [] as Array<GoodBase>
  store.getters.getAllGoods.forEach((good) => {
    goods.push({
      ID: good.Good.Good.ID,
      SeparateFee: good.Good.Good.SeparateFee,
      UnitPower: good.Good.Good.UnitPower,
      DurationDays: good.Good.Good.DurationDays,
      Actuals: good.Good.Good.Actuals,
      DeliveryAt: good.Good.Good.DeliveryAt,
      Price: good.Good.Good.Price,
      BenefitType: good.Good.Good.BenefitType,
      Classic: good.Good.Good.Classic,
      Title: good.Good.Good.Title,
      Total: good.Good.Good.Total,
      Unit: good.Good.Good.Unit
    } as GoodBase)
  })
  return goods
})
const appGoods = computed(() => store.getters.getAppGoods)
const selectedGoods = ref([] as Array<GoodBase>)
const selectedAppGoods = ref([] as Array<AppGood>)
const recommends = computed(() => store.getters.getRecommends)
const settings = computed(() => store.getters.getAppWithdrawSettings)
const coins = computed(() => store.getters.getCoins)

const selectedCoin = ref([] as Array<Coin>)

const onSetGoodOnline = () => {
  selectedAppGoods.value.forEach((appGood) => {
    store.dispatch(ApplicationActionTypes.OnsaleAppGood, {
      Info: {
        ID: appGood.ID,
        GoodID: appGood.GoodID,
        Price: appGood.Price,
        Online: true
      },
      Message: {
        ModuleKey: ModuleKey.ModuleApplication,
        Error: {
          Title: t('MSG_UPDATE_APP_GOOD_FAIL'),
          Popup: true,
          Type: NotificationType.Error
        }
      }
    })
  })
}

const onSetGoodOffline = () => {
  selectedAppGoods.value.forEach((appGood) => {
    store.dispatch(ApplicationActionTypes.OffsaleAppGood, {
      Info: {
        ID: appGood.ID,
        GoodID: appGood.GoodID,
        Price: appGood.Price,
        Online: false
      },
      Message: {
        ModuleKey: ModuleKey.ModuleApplication,
        Error: {
          Title: t('MSG_UPDATE_APP_GOOD_FAIL'),
          Popup: true,
          Type: NotificationType.Error
        }
      }
    })
  })
}

const goodPrice = ref(1000)

const onModifyPrice = () => {
  selectedAppGoods.value.forEach((appGood) => {
    store.dispatch(ApplicationActionTypes.SetAppGoodPrice, {
      Info: {
        ID: appGood.ID,
        GoodID: appGood.GoodID,
        Price: goodPrice.value,
        Online: false
      },
      Message: {
        ModuleKey: ModuleKey.ModuleApplication,
        Error: {
          Title: t('MSG_UPDATE_APP_GOOD_FAIL'),
          Popup: true,
          Type: NotificationType.Error
        }
      }
    })
  })
}

const modifying = ref(false)

const onAddRecommend = () => {
  modifying.value = true
}

const setting = computed(() => {
  if (selectedCoin.value.length > 0) {
    return store.getters.getAppWithdrawSettingByCoin(selectedCoin.value[0].ID as string)
  }
  return undefined as unknown as AppWithdrawSetting
})
const mySetting = ref(setting.value)

const withdrawAutoReviewCoinAmount = ref(0)
watch(selectedCoin, () => {
  if (selectedCoin.value.length > 0) {
    mySetting.value = store.getters.getAppWithdrawSettingByCoin(selectedCoin.value[0].ID as string)
    if (mySetting.value) {
      withdrawAutoReviewCoinAmount.value = mySetting.value.WithdrawAutoReviewCoinAmount
    }
  }
})

const onCreateAppWithdrawSetting = () => {
  if (selectedCoin.value.length > 0) {
    const setting = store.getters.getAppWithdrawSettingByCoin(selectedCoin.value[0].ID as string)
    if (!setting) {
      store.dispatch(ApplicationActionTypes.CreateAppWithdrawSetting, {
        Info: {
          CoinTypeID: selectedCoin.value[0].ID as string,
          WithdrawAutoReviewCoinAmount: withdrawAutoReviewCoinAmount.value
        },
        Message: {
          ModuleKey: ModuleKey.ModuleApplication,
          Error: {
            Title: t('MSG_CREATE_APP_WITHDRAW_SETTING_FAIL'),
            Popup: true,
            Type: NotificationType.Error
          }
        }
      })
    } else {
      store.dispatch(ApplicationActionTypes.UpdateAppWithdrawSetting, {
        Info: {
          ID: setting.ID,
          CoinTypeID: selectedCoin.value[0].ID as string,
          WithdrawAutoReviewCoinAmount: withdrawAutoReviewCoinAmount.value
        },
        Message: {
          ModuleKey: ModuleKey.ModuleApplication,
          Error: {
            Title: t('MSG_CREATE_APP_WITHDRAW_SETTING_FAIL'),
            Popup: true,
            Type: NotificationType.Error
          }
        }
      })
    }
  }
}

const onUpdate = (recommend: Recommend) => {
  // TODO: fileter the list
  console.log('update', recommend)
}

const onSubmit = (recommend: Recommend) => {
  modifying.value = false
  store.dispatch(ApplicationActionTypes.CreateRecommend, {
    Info: recommend,
    Message: {
      ModuleKey: ModuleKey.ModuleApplication,
      Error: {
        Title: t('MSG_CREATE_RECOMMEND_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })
}

const unsubscribe = ref<FunctionVoid>()

onMounted(() => {
  unsubscribe.value = store.subscribe((mutation) => {
    if (mutation.type === ApplicationMutationTypes.SetAppGoods) {
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

  store.dispatch(GoodActionTypes.GetAllGoods, {
    Message: {
      ModuleKey: ModuleKey.ModuleInternationalization,
      Error: {
        Title: t('MSG_GET_GOODS_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })

  store.dispatch(ApplicationActionTypes.GetAppGoods, {
    Message: {
      ModuleKey: ModuleKey.ModuleApplication,
      Error: {
        Title: t('MSG_GET_APP_GOODS_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })

  store.dispatch(ApplicationActionTypes.GetRecommends, {
    Message: {
      ModuleKey: ModuleKey.ModuleApplication,
      Error: {
        Title: t('MSG_GET_RECOMMENDS_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })
})

onUnmounted(() => {
  unsubscribe.value?.()
})

</script>
