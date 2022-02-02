<template>
  <div class='good-tools row'>
    <q-space />
    <q-btn
      dense
      flat
      no-caps
      :label='$t("MSG_CREATE_COININFO")'
      class='tool-btn'
      @click='onCreateCoinInfoClick'
    />
    <q-btn
      dense
      flat
      no-caps
      :label='$t("MSG_CREATE_FEE_TYPE")'
      class='tool-btn'
      @click='onCreateFeeTypeClick'
    />
    <q-btn
      dense
      flat
      no-caps
      :label='$t("MSG_CREATE_DEVICE")'
      class='tool-btn'
      @click='onCreateDeviceClick'
    />
    <q-btn
      dense
      flat
      no-caps
      :label='$t("MSG_CREATE_VENDOR_LOCATION")'
      class='tool-btn'
      @click='onCreateVendorLocationClick'
    />
    <q-btn
      dense
      flat
      no-caps
      :label='$t("MSG_CREATE_GOOD")'
      class='tool-btn'
      @click='onCreateGoodClick'
    />
  </div>
</template>

<script setup lang='ts'>
import { defineEmits } from 'vue'

const emit = defineEmits<{(e: 'createDevice'): void,
  (e: 'createGood'): void,
  (e: 'createVendorLocation'): void,
  (e: 'createFeeType'): void,
  (e: 'createCoininfo'): void
}>()

const onCreateDeviceClick = () => {
  emit('createDevice')
}

const onCreateGoodClick = () => {
  emit('createGood')
}

const onCreateVendorLocationClick = () => {
  emit('createVendorLocation')
}

const onCreateFeeTypeClick = () => {
  emit('createFeeType')
}

const onCreateCoinInfoClick = () => {
  emit('createCoininfo')
}

</script>

<style lang='sass' scoped>
.good-tools
  width: 400px
  border-bottom: solid 1px $grey-4

.tool-btn
  color: blue
  font-size: 10px
</style>
