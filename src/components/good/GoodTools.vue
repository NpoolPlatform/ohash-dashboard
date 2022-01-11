<template>
  <div class='good-tools row'>
    <q-space />
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

const emit = defineEmits<{(e: 'createDevice'): void, (e: 'createGood'): void, (e: 'createVendorLocation'): void}>()

const onCreateDeviceClick = () => {
  emit('createDevice')
}

const onCreateGoodClick = () => {
  emit('createGood')
}

const onCreateVendorLocationClick = () => {
  emit('createVendorLocation')
}

</script>

<style lang='sass' scoped>
.tool-btn
  color: blue
  font-size: 10px
</style>
