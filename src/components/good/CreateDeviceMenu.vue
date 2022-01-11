<template>
  <q-card>
    <q-card-section>
      <q-item-label>{{ $t('MSG_CREATE_DEVICE') }}</q-item-label>
    </q-card-section>
    <q-item-section>
      <q-input
        v-model='myDeviceType'
        :label='$t("MSG_DEVICE_TYPE")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <q-input
        v-model='manufacturer'
        :label='$t("MSG_DEVICE_MANUFACTURER")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <q-input
        v-model='consumption'
        :label='$t("MSG_DEVICE_CONSUMPTION")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <q-input
        v-model='shipmentAt'
        :label='$t("MSG_DEVICE_SHIPMENT_AT")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
    </q-item-section>
    <q-item-section>
      <q-btn
        class='submit-btn'
        :label='$t("MSG_SUBMIT")'
        @click='onSubmit'
      />
    </q-item-section>
  </q-card>
</template>

<script setup lang='ts'>
import { ref, defineEmits, watch, withDefaults, defineProps, toRef } from 'vue'
import { DeviceInfo } from 'src/store/goods/types'

const manufacturer = ref('')
const consumption = ref(0)
const shipmentAt = ref(0)

interface Props {
  inputDeviceType: string
}

const props = withDefaults(defineProps<Props>(), {
  inputDeviceType: ''
})

const inputDeviceType = toRef(props, 'inputDeviceType')
const myDeviceType = ref(inputDeviceType.value)

const emit = defineEmits<{(e: 'submit', info: DeviceInfo): void, (e: 'update:inputDeviceType', type: string): void}>()

const onSubmit = () => {
  emit('submit', {
    Manufacturer: manufacturer.value,
    Consumption: consumption.value,
    ShipmentAt: shipmentAt.value,
    Type: inputDeviceType.value
  })
}

watch(myDeviceType, function (val) {
  emit('update:inputDeviceType', val)
})

</script>

<style lang='sass' scoped>
.submit-btn
  margin-top: 24px
  background-color: $blue-6
  color: white
</style>
