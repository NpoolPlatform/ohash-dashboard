<template>
  <div class='row good-tools'>
    <q-space />
    <GoodTools
      @create-device='onCreateDeviceClick'
      @create-good='onCreateGoodClick'
      @create-vendor-location='onCreateVendorLocationClick'
      @create-fee-type='onCreateFeeTypeClick'
    />
  </div>
  <q-table :title='$t("MSG_DEVICE")' flat dense :rows='filterDevices' />
  <q-table :title='$t("MSG_VENDOR_LOCATION")' flat dense :rows='filterVendorLocations' />
  <q-table :title='$t("MSG_COIN")' flat dense :rows='allCoins' />
  <q-table :title='$t("MSG_FEE_TYPE")' flat dense :rows='filterFeeTypes' />
  <q-table :title='$t("MSG_GOOD")' flat dense :rows='filterGoods' />
  <q-dialog
    v-model='adding'
    position='right'
    square
    no-shake
    @hide='onMenuHide'
  >
    <CreateGoodMenu
      v-if='addingType === AddingType.AddingGood'
      v-model:devices='allDevices'
      v-model:vendor-locations='allVendorLocations'
      v-model:coins='allCoins'
      class='add-menu'
    />
    <CreateDeviceMenu
      v-if='addingType === AddingType.AddingDevice'
      v-model:input-device-type='inputDeviceType'
      class='add-menu'
      @submit='onCreateDeviceSubmit'
    />
    <CreateVendorLocationMenu
      v-if='addingType === AddingType.AddingVendorLocation'
      v-model:input-country='inputCountry'
      v-model:input-province='inputProvince'
      v-model:input-city='inputCity'
      v-model:input-address='inputAddress'
      class='add-menu'
      @submit='onCreateVendorLocationSubmit'
    />
    <CreateFeeTypeMenu
      v-if='addingType === AddingType.AddingFeeType'
      v-model:input-fee-type='inputFeeType'
      v-model:input-fee-description='inputFeeDescription'
      v-model:input-pay-type='inputPayType'
      class='add-menu'
      @submit='onCreateFeeTypeSubmit'
    />
  </q-dialog>
</template>

<script setup lang='ts'>
import { onMounted, computed, defineAsyncComponent, ref, watch } from 'vue'
import { useStore } from 'src/store'

import { ActionTypes as GoodActionTypes } from 'src/store/goods/action-types'
import { ActionTypes as CoinActionTypes } from 'src/store/coins/action-types'
import { MutationTypes as NotificationMutationTypes } from 'src/store/notifications/mutation-types'
import { ModuleKey, Type as NotificationType } from 'src/store/notifications/const'
import { notify, notificationPop } from 'src/store/notifications/helper'
import { useI18n } from 'vue-i18n'
import { DeviceInfo, FeeType, VendorLocation } from 'src/store/goods/types'
import { FunctionVoid } from 'src/types/types'

const CreateGoodMenu = defineAsyncComponent(() => import('src/components/good/CreateGoodMenu.vue'))
const CreateDeviceMenu = defineAsyncComponent(() => import('src/components/good/CreateDeviceMenu.vue'))
const CreateVendorLocationMenu = defineAsyncComponent(() => import('src/components/good/CreateVendorLocationMenu.vue'))
const CreateFeeTypeMenu = defineAsyncComponent(() => import('src/components/good/CreateFeeTypeMenu.vue'))
const GoodTools = defineAsyncComponent(() => import('src/components/good/GoodTools.vue'))

enum AddingType {
  AddingNone = 'none',
  AddingDevice = 'device',
  AddingVendorLocation = 'vendor-location',
  AddingGood = 'good',
  AddingFeeType = 'fee-type',
  AddingFee = 'fee'
}

const addingType = ref(AddingType.AddingNone)
const adding = ref(false)

const inputDeviceType = ref('')

const inputCountry = ref('')
const inputProvince = ref('')
const inputCity = ref('')
const inputAddress = ref('')

const inputFeeType = ref('')
const inputFeeDescription = ref('')
const inputPayType = ref('')

const store = useStore()

const allGoods = computed(() => store.getters.getAllGoods)
const filterGoods = computed(() => allGoods.value)

const allVendorLocations = computed(() => store.getters.getAllVendorLocations)
const filterVendorLocations = computed(() => {
  return allVendorLocations.value.filter((vendorLocation) => {
    return vendorLocation.Country.toLowerCase().includes(inputCountry.value.toLowerCase()) &&
      vendorLocation.Province.toLowerCase().includes(inputProvince.value.toLowerCase()) &&
      vendorLocation.City.toLowerCase().includes(inputCity.value.toLowerCase()) &&
      vendorLocation.Address.toLowerCase().includes(inputAddress.value.toLowerCase())
  })
})

const allDevices = computed(() => store.getters.getAllDevices)
const filterDevices = computed(() => {
  return allDevices.value.filter((device) => {
    return device.Type.toLowerCase().includes(inputDeviceType.value.toLowerCase())
  })
})

const allCoins = computed(() => store.getters.getCoins)

const allFeeTypes = computed(() => {
  return store.getters.getAllFeeTypes.filter((feeType) => {
    return feeType.FeeType.toLowerCase().includes(inputFeeType.value.toLowerCase())
  })
})
const filterFeeTypes = computed(() => allFeeTypes.value)

// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const unsubscribe = ref<FunctionVoid>()

onMounted(() => {
  store.dispatch(GoodActionTypes.GetAllGoods, {
    Message: {
      ModuleKey: ModuleKey.ModuleGoods,
      Error: {
        Title: t('MSG_GET_ALL_GOODS_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })
  store.dispatch(GoodActionTypes.GetAllDevices, {
    Message: {
      ModuleKey: ModuleKey.ModuleGoods,
      Error: {
        Title: t('MSG_GET_ALL_DEVICES_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })
  store.dispatch(GoodActionTypes.GetAllVendorLocations, {
    Message: {
      ModuleKey: ModuleKey.ModuleGoods,
      Error: {
        Title: t('MSG_GET_ALL_VENDOR_LOCATIONS_FAIL'),
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
  store.dispatch(GoodActionTypes.GetAllFeeTypes, {
    Message: {
      ModuleKey: ModuleKey.ModuleGoods,
      Error: {
        Title: t('MSG_GET_ALL_FEE_TYPES_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })
  store.dispatch(GoodActionTypes.GetAllFees, {
    Message: {
      ModuleKey: ModuleKey.ModuleGoods,
      Error: {
        Title: t('MSG_GET_ALL_FEES_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })

  unsubscribe.value = store.subscribe((mutation) => {
    if (mutation.type === NotificationMutationTypes.Push) {
      const notification = store.getters.peekNotification(ModuleKey.ModuleGoods)
      if (notification) {
        notify(notification)
        store.commit(NotificationMutationTypes.Pop, notificationPop(notification))
      }
    }
  })
})

watch(addingType, (val) => {
  adding.value = val !== AddingType.AddingNone
})

const onCreateDeviceClick = () => {
  addingType.value = AddingType.AddingDevice
}

const onCreateGoodClick = () => {
  addingType.value = AddingType.AddingGood
}

const onCreateVendorLocationClick = () => {
  addingType.value = AddingType.AddingVendorLocation
}

const onCreateFeeTypeClick = () => {
  addingType.value = AddingType.AddingFeeType
}

const onCreateDeviceSubmit = (device: DeviceInfo) => {
  addingType.value = AddingType.AddingNone
  store.dispatch(GoodActionTypes.CreateDevice, {
    Info: device,
    Message: {
      ModuleKey: ModuleKey.ModuleGoods,
      Error: {
        Title: t('MSG_CREATE_DEVICE_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })
  inputDeviceType.value = ''
}

const onCreateVendorLocationSubmit = (vendorLication: VendorLocation) => {
  addingType.value = AddingType.AddingNone
  store.dispatch(GoodActionTypes.CreateVendorLocation, {
    Info: vendorLication,
    Message: {
      ModuleKey: ModuleKey.ModuleGoods,
      Error: {
        Title: t('MSG_CREATE_DEVICE_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })

  inputCountry.value = ''
  inputProvince.value = ''
  inputCity.value = ''
  inputAddress.value = ''
}

const onCreateFeeTypeSubmit = (feeType: FeeType) => {
  addingType.value = AddingType.AddingNone
  store.dispatch(GoodActionTypes.CreateFeeType, {
    Info: feeType,
    Message: {
      ModuleKey: ModuleKey.ModuleGoods,
      Error: {
        Title: t('MSG_CREATE_FEE_TYPE_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })

  inputFeeType.value = ''
  inputFeeDescription.value = ''
  inputPayType.value = ''
}

const onMenuHide = () => {
  addingType.value = AddingType.AddingNone
}

</script>

<style lang='sass' scoped>
.good-tools
  margin-right: 8px

.add-menu
  width: 400px
  padding: 0 24px 24px 24px
</style>
