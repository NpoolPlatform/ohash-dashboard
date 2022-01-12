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
      <div class='row'>
        <q-icon name='window' class='selector-icon' size='24px' />
        <q-btn-dropdown
          flat
          dense
          split
          no-caps
          align='left'
          :label='coinName'
        >
          <q-list>
            <q-item
              v-for='(coin, index) in coins'
              :key='index'
              v-close-popup
              clickable
              @click='onCoinItemClick(index)'
            >
              <q-item-section>
                <q-item-label>{{ coin.Name }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>
    </q-item-section>
    <q-item-section>
      <q-toggle
        v-model='myActuals' :label='$t("MSG_ACTUALS")' dense
      />
      <q-toggle
        v-model='mySeparateFee' :label='$t("MSG_SEPARATE_FEE")' dense
      />
      <q-toggle
        v-model='myClassic' :label='$t("MSG_MODE_CLASSIC")' dense
      />
      <div>
        <q-btn-toggle
          v-model='myBenefitType'
          no-caps
          rounded
          unelevated
          class='toggle-btn'
          :options='benefitTypes'
        />
      </div>
    </q-item-section>
    <q-item-section>
      <q-input
        v-model='myTotal'
        :label='$t("MSG_GOOD_TOTAL")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <q-input
        v-model='myPrice'
        :label='$t("MSG_GOOD_PRICE")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <q-input
        v-model='myDurationDays'
        :label='$t("MSG_GOOD_DURATION_DAYS")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <q-input
        v-model='myCoinType'
        :label='$t("MSG_GOOD_COIN_TYPE")'
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
import { Coin } from 'src/store/coins/types'
import { DeviceInfo, VendorLocation } from 'src/store/goods/types'
import { withDefaults, defineProps, toRef, computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

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
  coins: Array<Coin>
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

const inputTitle = toRef(props, 'inputTitle')
const inputActuals = toRef(props, 'inputActuals')
const inputSeparateFee = toRef(props, 'inputSeparateFee')
const inputClassic = toRef(props, 'inputClassic')
const inputBenefitType = toRef(props, 'inputBenefitType')
const inputTotal = toRef(props, 'inputTotal')
const inputPrice = toRef(props, 'inputPrice')
const inputDurationDays = toRef(props, 'inputDurationDays')
const inputCoinType = toRef(props, 'inputCoinType')
const devices = toRef(props, 'devices')
const vendorLocations = toRef(props, 'vendorLocations')
const coins = toRef(props, 'coins')

const selectedCoinIndex = ref(0)
const coinName = computed(() => coins.value[selectedCoinIndex.value].Name)

const selectedDeviceIndex = ref(0)
const deviceLabel = computed(() => devices.value[selectedDeviceIndex.value].Type)

const selectedVendorLocationIndex = ref(0)
const vendorLocationLabel = computed(() =>
  vendorLocationToLabel(vendorLocations.value[selectedVendorLocationIndex.value])
)

const myTitle = ref(inputTitle.value)
const myActuals = ref(inputActuals.value)
const mySeparateFee = ref(inputSeparateFee.value)
const myClassic = ref(inputClassic.value)
const myBenefitType = ref(inputBenefitType.value)
const myTotal = ref(inputTotal.value)
const myPrice = ref(inputPrice.value)
const myDurationDays = ref(inputDurationDays.value)
const myCoinType = ref(inputCoinType.value)

// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const benefitTypes = [
  {
    label: t('MSG_BENEFIT_TYPE_PLATFORM'),
    value: 'platform'
  }, {
    label: t('MSG_BENEFIT_TYPE_POOL'),
    value: 'pool'
  }
]

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

const onCoinItemClick = (index: number) => {
  selectedCoinIndex.value = index
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

.toggle-btn
  border: 1px solid #027be3
</style>
