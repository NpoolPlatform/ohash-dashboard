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
  </div>
</template>

<script setup lang='ts'>
import { defineEmits } from 'vue'

const emit = defineEmits<{(e: 'createDevice'): void }>()

const onCreateDeviceClick = () => {
  emit('createDevice')
}

</script>

<style lang='sass' scoped>
.tool-btn
  color: blue
  font-size: 10px
</style>
