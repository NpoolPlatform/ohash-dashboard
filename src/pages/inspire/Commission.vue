<template>
  <q-table
    v-model:selected='selectedCoin'
    flat
    dense
    :rows='coins'
    selection='single'
    row-key='ID'
  >
    <template #top-right>
      <div class='row'>
        <q-space />
        <div>
          <q-item-label>{{ t('MSG_STABLE_COIN_ONLY') }}</q-item-label>
        </div>
      </div>
    </template>
  </q-table>
  <q-table
    flat
    dense
    :rows='commissionCoins'
  />
  <q-table
    v-model:selected='selectedUser'
    flat
    dense
    :rows='myUsers ? myUsers : []'
    selection='single'
    row-key='ID'
  />
  <q-table
    flat
    dense
    :rows='appCommissionSetting ? [appCommissionSetting] : []'
    :title='t("MSG_APP_COMMISSION_SETTING")'
    @row-click='(evt, row, index) => onAppCommissionSettingClick(row as AppCommissionSetting)'
  >
    <template v-if='!appCommissionSetting' #top-right>
      <div class='row'>
        <q-space />
        <q-btn :label='t("MSG_CREATE")' @click='onCreateAppCommissionSetting' />
      </div>
    </template>
  </q-table>
  <q-table
    flat
    dense
    :rows='appPurchaseAmountSettings ? appPurchaseAmountSettings : []'
    :title='t("MSG_APP_PURCHASE_AMOUNT_SETTING")'
    @row-click='(evt, row, index) => onAppPurchaseAmountSettingClick(row as AppPurchaseAmountSetting)'
  >
    <template #top-right>
      <div class='row'>
        <q-space />
        <q-btn :label='t("MSG_CREATE")' @click='onCreateAppPurchaseAmountSetting' />
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
    <CreateAppCommissionSetting
      v-if='addingType === AddingType.AddingAppCommissionSetting'
      v-model:edit-setting='selectedAppCommissionSetting'
      @update='onUpdateAppCommissionSetting'
      @submit='onSubmitAppCommissionSetting'
    />
    <CreateAppPurchaseAmountSetting
      v-if='addingType === AddingType.AddingTypeAppPurchaseAmountSetting'
      v-model:edit-setting='editAppPurchaseAmountSetting'
      v-model:edit-user='editUser'
      @update='onUpdateAppPurchaseAmountSetting'
      @submit='onSubmitAppPurchaseAmountSetting'
    />
  </q-dialog>
</template>

<script setup lang='ts'>
import { onMounted, computed, ref, onUnmounted, defineAsyncComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from 'src/store'
import { ActionTypes as InspireActionTypes } from 'src/store/inspire/action-types'
import { ModuleKey, Type as NotificationType } from 'src/store/notifications/const'
import { FunctionVoid } from 'src/types/types'
import { MutationTypes as InspireMutationTypes } from 'src/store/inspire/mutation-types'
import { ActionTypes as UserActionTypes } from 'src/store/user-helper/action-types'
import { ActionTypes as CoinActionTypes } from 'src/store/coins/action-types'
import {
  AppCommissionSetting,
  AppPurchaseAmountSetting
} from 'src/store/inspire/types'
import { AppUser } from 'src/store/user-helper/types'
import { Coin } from 'src/store/coins/types'

const CreateAppCommissionSetting = defineAsyncComponent(() => import('src/components/inspire/CreateAppCommissionSetting.vue'))
const CreateAppPurchaseAmountSetting = defineAsyncComponent(() => import('src/components/inspire/CreateAppPurchaseAmountSetting.vue'))

const store = useStore()
// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const editAppPurchaseAmountSetting = ref(undefined as unknown as AppPurchaseAmountSetting)

const users = computed(() => store.getters.getAppUserInfos)
const myUsers = computed(() => {
  const allUsers = [] as Array<AppUser>
  if (users.value) {
    users.value.forEach((user) => {
      allUsers.push(user.User as AppUser)
    })
  }
  return allUsers
})
const selectedUser = ref([] as Array<AppUser>)
const editUser = computed(() => selectedUser.value.length > 0 ? selectedUser.value[0] : undefined as unknown as AppUser)

const coins = computed(() => store.getters.getCoins)
const selectedCoin = ref([] as Array<Coin>)

const appCommissionSetting = computed(() => store.getters.getAppCommissionSetting)
const selectedAppCommissionSetting = ref(undefined as unknown as AppCommissionSetting)

const appPurchaseAmountSettings = computed(() => store.getters.getAppPurchaseAmountSettings)
const commissionCoins = computed(() => store.getters.getCommissionCoins)

const loading = ref(false)

const unsubscribe = ref<FunctionVoid>()

onMounted(() => {
  store.dispatch(CoinActionTypes.GetCoins, {
    Message: {
      ModuleKey: ModuleKey.ModuleInspire,
      Error: {
        Title: t('MSG_GET_COINS_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })

  store.dispatch(InspireActionTypes.GetCommissionCoinSettings, {
    Message: {
      ModuleKey: ModuleKey.ModuleInspire,
      Error: {
        Title: t('MSG_GET_COMMISSION_COINS_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })

  loading.value = true
  store.dispatch(UserActionTypes.GetAppUserInfos, {
    Message: {
      ModuleKey: ModuleKey.ModuleInspire,
      Error: {
        Title: t('MSG_GET_APP_USER_INFOS_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })

  store.dispatch(InspireActionTypes.GetAppCommissionSetting, {
    Message: {
      ModuleKey: ModuleKey.ModuleInspire,
      Error: {
        Title: t('MSG_GET_APP_COMMISSION_SETTING_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })

  store.dispatch(InspireActionTypes.GetAppPurchaseAmountSettings, {
    Message: {
      ModuleKey: ModuleKey.ModuleInspire,
      Error: {
        Title: t('MSG_GET_APP_PURCHASE_AMOUNT_SETTINGS_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })

  unsubscribe.value = store.subscribe((mutation) => {
    if (mutation.type === InspireMutationTypes.SetAppPurchaseAmountSettings) {
      loading.value = false
    }
  })
})

onUnmounted(() => {
  unsubscribe.value?.()
})

const adding = ref(false)
const updating = ref(false)
const modifying = ref(false)

enum AddingType {
  AddingNone = 'none',
  AddingAppCommissionSetting = 'app-commission-setting',
  AddingAppInvitationSetting = 'app-invitation-setting',
  AddingTypeAppPurchaseAmountSetting = 'app-purchase-amount-setting',
  AddingTypeAppUserPurchaseAmountSetting = 'app-user-purchase-amount-setting'
}
const addingType = ref(AddingType.AddingNone)

const onCreateAppCommissionSetting = () => {
  addingType.value = AddingType.AddingAppCommissionSetting
  adding.value = true
  modifying.value = true
}

const onAppCommissionSettingClick = (setting: AppCommissionSetting) => {
  selectedAppCommissionSetting.value = setting
  addingType.value = AddingType.AddingAppCommissionSetting
  updating.value = true
  modifying.value = true
}

const onCreateAppPurchaseAmountSetting = () => {
  addingType.value = AddingType.AddingTypeAppPurchaseAmountSetting
  adding.value = true
  modifying.value = true
}

const onAppPurchaseAmountSettingClick = (setting: AppPurchaseAmountSetting) => {
  editAppPurchaseAmountSetting.value = setting
  addingType.value = AddingType.AddingTypeAppPurchaseAmountSetting
  updating.value = true
  modifying.value = true
}

const onMenuHide = () => {
  adding.value = false
  updating.value = false
  modifying.value = false
  addingType.value = AddingType.AddingNone

  selectedAppCommissionSetting.value = undefined as unknown as AppCommissionSetting
  editAppPurchaseAmountSetting.value = undefined as unknown as AppPurchaseAmountSetting
}

const onUpdateAppCommissionSetting = (setting: AppCommissionSetting) => {
  console.log(setting)
}

const onSubmitAppCommissionSetting = (setting: AppCommissionSetting) => {
  let action = InspireActionTypes.CreateAppCommissionSetting
  if (updating.value) {
    action = InspireActionTypes.UpdateAppCommissionSetting
  }

  store.dispatch(action, {
    Info: setting,
    Message: {
      ModuleKey: ModuleKey.ModuleInspire,
      Error: {
        Title: t('MSG_CREATE_APP_COMMISSION_SETTING_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })

  onMenuHide()
}

const onUpdateAppPurchaseAmountSetting = (setting: AppPurchaseAmountSetting) => {
  console.log(setting)
}

const onSubmitAppPurchaseAmountSetting = (setting: AppPurchaseAmountSetting) => {
  store.dispatch(InspireActionTypes.CreateAppPurchaseAmountSettingForAppOtherUser, {
    TargetUserID: setting.UserID,
    Info: setting,
    Message: {
      ModuleKey: ModuleKey.ModuleInspire,
      Error: {
        Title: t('MSG_CREATE_APP_PURCHASE_AMOUNT_SETTING_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })

  onMenuHide()
}

</script>

<style lang='sass' scoped>
.bottom-table
  margin-bottom: 200px
</style>
