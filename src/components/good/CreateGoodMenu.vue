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
          :label='myCoinType'
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
      <div class='row'>
        <q-icon name='window' class='selector-icon' size='24px' />
        <q-btn-dropdown
          flat
          dense
          split
          no-caps
          align='left'
          :label='priceCurrencyType'
        >
          <q-list>
            <q-item
              v-for='(priceCurrency, index) in priceCurrencys'
              :key='index'
              v-close-popup
              clickable
              @click='onPriceCurrencyItemClick(index)'
            >
              <q-item-section>
                <q-item-label>{{ priceCurrency.Name }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>
      <div>
        <q-select
          v-model='selectedFeeTypes'
          multiple
          emit-value
          :options='myFeeTypes'
          :label='t("MSG_FEE_TYPE")'
        />
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
        v-model='myUnitPower'
        :label='$t("MSG_GOOD_UNIT_POWER")'
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
import { DefaultID } from 'src/const/const'
import { Coin } from 'src/store/coins/types'
import { DeviceInfo, FeeType, Good, PriceCurrency, VendorLocation } from 'src/store/goods/types'
import { withDefaults, defineProps, toRef, computed, ref, defineEmits } from 'vue'
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
  inputUnitPower: number
  inputCoinType: string
  devices: Array<DeviceInfo>
  vendorLocations: Array<VendorLocation>
  coins: Array<Coin>
  feeTypes: Array<FeeType>
  priceCurrencys: Array<PriceCurrency>
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
const inputTotal = toRef(props, 'inputTotal')
const inputPrice = toRef(props, 'inputPrice')
const inputDurationDays = toRef(props, 'inputDurationDays')
const inputUnitPower = toRef(props, 'inputUnitPower')

const devices = computed(() => {
  const devices = toRef(props, 'devices')
  if (devices.value) {
    return devices.value
  }
  return []
})
const vendorLocations = computed(() => {
  const vendorLocations = toRef(props, 'vendorLocations')
  if (vendorLocations.value) {
    return vendorLocations.value
  }
  return []
})
const coins = computed(() => {
  const coins = toRef(props, 'coins')
  if (coins.value) {
    return coins.value
  }
  return [] as Array<Coin>
})
const feeTypes = computed(() => {
  const feeTypes = toRef(props, 'feeTypes')
  if (feeTypes.value) {
    return feeTypes.value
  }
  return []
})
const priceCurrencys = computed(() => {
  const priceCurrencys = toRef(props, 'priceCurrencys')
  if (priceCurrencys.value) {
    return priceCurrencys.value
  }
  return []
})

const selectedCoinIndex = ref(0)
const myCoinType = computed(() => coins.value[selectedCoinIndex.value].Name)
const coinID = computed(() => coins.value[selectedCoinIndex.value].ID)

const selectedDeviceIndex = ref(0)
const deviceLabel = computed(() => devices.value[selectedDeviceIndex.value].Type)
const deviceID = computed(() => devices.value[selectedDeviceIndex.value].ID)

const selectedVendorLocationIndex = ref(0)
const vendorLocationLabel = computed(() =>
  vendorLocationToLabel(vendorLocations.value[selectedVendorLocationIndex.value])
)
const vendorLocationID = computed(() => vendorLocations.value[selectedVendorLocationIndex.value].ID)

const myTitle = ref(inputTitle.value)
const myActuals = ref(inputActuals.value)
const mySeparateFee = ref(inputSeparateFee.value)
const myClassic = ref(inputClassic.value)
const myTotal = ref(inputTotal.value)
const myPrice = ref(inputPrice.value)
const myDurationDays = ref(inputDurationDays.value)
const myUnitPower = ref(inputUnitPower.value)

const selectedPriceCurrencyIndex = ref(0)
const priceCurrencyType = computed(() => priceCurrencys.value[selectedPriceCurrencyIndex.value].Name)
const priceCurrencyID = computed(() => priceCurrencys.value[selectedPriceCurrencyIndex.value].ID)

const myDeliveryAt = ref(0)
const myUnit = ref('TiB')

interface MyFeeType {
  label: string
  value: FeeType
}

const myFeeTypes = computed(() => {
  const localFeeTypes = [] as Array<MyFeeType>
  feeTypes.value.forEach((feeType) => {
    localFeeTypes.push({
      label: feeType.FeeType,
      value: feeType
    })
  })
  return localFeeTypes
})
const selectedFeeTypes = ref([])

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
const myBenefitType = ref('platform')

const vendorLocationToLabel = (vendorLocation: VendorLocation) => {
  return vendorLocation.Country + ' / ' +
    vendorLocation.Province + ' / ' +
    vendorLocation.City + ' / ' +
    vendorLocation.Address
}

const emit = defineEmits<{(e: 'submit', good: Good): void}>()

const onSubmit = () => {
  emit('submit', {
    DeviceInfoID: deviceID.value as string,
    SeparateFee: mySeparateFee.value,
    UnitPower: myUnitPower.value,
    DurationDays: myDurationDays.value,
    CoinInfoID: coinID.value,
    Actuals: myActuals.value,
    DeliveryAt: myDeliveryAt.value,
    InheritFromGoodID: DefaultID,
    VendorLocationID: vendorLocationID.value as string,
    Price: myPrice.value,
    BenefitType: myBenefitType.value,
    Classic: myClassic.value,
    SupportCoinTypeIDs: [] as Array<string>,
    Title: myTitle.value,
    Total: myTotal.value,
    Unit: myUnit.value,
    FeeIDs: [] as Array<string>,
    PriceCurrency: priceCurrencyID.value as string
  })
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

const onPriceCurrencyItemClick = (index: number) => {
  selectedPriceCurrencyIndex.value = index
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
