<template>
  <q-card>
    <q-card-section>
      <q-item-label>{{ $t('MSG_CREATE_GOOD') }}</q-item-label>
    </q-card-section>
    <q-item-section>
      <q-input
        v-model='myTitle'
        :label='$t("MSG_GOOD_NAME")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <div class='row'>
        <q-icon name='window' class='selector-icon' size='24px' />
        <q-btn-dropdown
          flat
          dense
          split
          no-caps
          align='left'
          :label='deviceLabel'
        >
          <q-list>
            <q-item
              v-for='(device, index) in devices'
              :key='index'
              v-close-popup
              clickable
              @click='onDeviceItemClick(index)'
            >
              <q-item-section>
                <q-item-label>{{ device.Type }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>
      <div class='row'>
        <q-icon name='window' class='selector-icon' size='24px' />
        <q-btn-dropdown
          flat
          dense
          split
          no-caps
          align='left'
          :label='vendorLocationLabel'
        >
          <q-list>
            <q-item
              v-for='(vendorLocation, index) in vendorLocations'
              :key='index'
              v-close-popup
              clickable
              @click='onVendorLocationItemClick(index)'
            >
              <q-item-section>
                <q-item-label>{{ vendorLocationToLabel(vendorLocation) }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>
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
import { DeviceInfo, VendorLocation } from 'src/store/goods/types'
import { withDefaults, defineProps, toRef, computed, ref } from 'vue'

interface Props {
  inputTitle: string
  inputActuals: boolean
  inputBenefitType: string
  inputClassic: boolean
  inputTotal: number
  inputDurationDays: number
  inputSeparateFee: boolean
  inputPrice: number
  inputCoinType: string
  devices: Array<DeviceInfo>
  vendorLocations: Array<VendorLocation>
}

const props = withDefaults(defineProps<Props>(), {
  inputTitle: '',
  inputActuals: true,
  inputBenefitType: 'platform',
  inputClassic: true,
  inputTotal: 0,
  inputDurationDays: 360,
  inputSeparateFee: true,
  inputPrice: 0,
  inputCoinType: ''
})

const myTitle = toRef(props, 'inputTitle')
const devices = toRef(props, 'devices')
const vendorLocations = toRef(props, 'vendorLocations')

const selectedDeviceIndex = ref(0)
const deviceLabel = computed(() => devices.value[selectedDeviceIndex.value].Type)

const selectedVendorLocationIndex = ref(0)
const vendorLocationLabel = computed(() =>
  vendorLocationToLabel(vendorLocations.value[selectedVendorLocationIndex.value])
)

const vendorLocationToLabel = (vendorLocation: VendorLocation) => {
  return vendorLocation.Country + ' / ' +
    vendorLocation.Province + ' / ' +
    vendorLocation.City + ' / ' +
    vendorLocation.Address
}

const onSubmit = () => {
  console.log('submit click')
}

const onDeviceItemClick = (index: number) => {
  selectedDeviceIndex.value = index
}

const onVendorLocationItemClick = (index: number) => {
  selectedVendorLocationIndex.value = index
}

</script>

<style lang='sass' scoped>
.submit-btn
  margin-top: 24px
  background-color: $blue-6
  color: white

.selector-icon
  padding: 10px 8px 10px 0px
  color: $grey-6
</style>
