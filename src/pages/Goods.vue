<template>
  <div class='row good-tools'>
    <q-space />
    <GoodTools
      @create-device='onCreateDeviceClick'
      @create-good='onCreateGoodClick'
      @create-vendor-location='onCreateVendorLocationClick'
    />
  </div>
  <q-table :title='$t("MSG_DEVICE_LIST")' flat dense :rows='allDevices' />
  <q-table :title='$t("MSG_VENDOR_LOCATION_LIST")' flat dense :rows='allGoods' />
  <q-table :title='$t("MSG_GOOD_LIST")' flat dense :rows='allGoods' />
  <q-dialog
    v-model='adding'
    position='right'
    square
    no-shake
    @hide='onMenuHide'
  >
    <CreateGoodMenu v-if='addingType === AddingType.AddingGood' class='add-menu' />
    <CreateDeviceMenu
      v-if='addingType === AddingType.AddingDevice'
      class='add-menu'
      @submit='onCreateDeviceSubmit'
    />
  </q-dialog>
</template>

<script setup lang='ts'>
import { onMounted, computed, defineAsyncComponent, ref, watch } from 'vue'
import { useStore } from 'src/store'

import { ActionTypes as GoodActionTypes } from 'src/store/goods/action-types'
import { ModuleKey, Type as NotificationType } from 'src/store/notifications/const'
import { useI18n } from 'vue-i18n'
import { DeviceInfo } from 'src/store/goods/types'

const CreateGoodMenu = defineAsyncComponent(() => import('src/components/good/CreateGoodMenu.vue'))
const CreateDeviceMenu = defineAsyncComponent(() => import('src/components/good/CreateDeviceMenu.vue'))
const GoodTools = defineAsyncComponent(() => import('src/components/good/GoodTools.vue'))

enum AddingType {
  AddingNone = 'none',
  AddingDevice = 'device',
  AddingVendorLocation = 'vendor-location',
  AddingGood = 'good'
}

const addingType = ref(AddingType.AddingNone)
const adding = ref(false)

const store = useStore()
const allGoods = computed(() => store.getters.getAllGoods)
const allDevices = computed(() => store.getters.getAllDevices)

// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

onMounted(() => {
  store.dispatch(GoodActionTypes.GetAllGoods, {
    Message: {
      ModuleKey: ModuleKey.ModuleReviews,
      Error: {
        Title: t('MSG_GET_ALL_GOODS_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })
  store.dispatch(GoodActionTypes.GetAllDevices, {
    Message: {
      ModuleKey: ModuleKey.ModuleReviews,
      Error: {
        Title: t('MSG_GET_ALL_DEVICES_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })
})

watch(addingType, function (val) {
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

const onCreateDeviceSubmit = (device: DeviceInfo) => {
  addingType.value = AddingType.AddingNone
  // TODO: create device
  console.log(device)
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
