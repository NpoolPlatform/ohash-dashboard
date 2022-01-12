<template>
  <q-card>
    <q-card-section>
      <q-item-label>{{ $t('MSG_CREATE_FEE') }}</q-item-label>
    </q-card-section>
    <q-item-section>
      <q-input
        v-model='myCountry'
        :label='$t("MSG_COUNTRY")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <q-input
        v-model='myProvince'
        :label='$t("MSG_PROVINCE")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <q-input
        v-model='myCity'
        :label='$t("MSG_CITY")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <q-input
        v-model='myAddress'
        :label='$t("MSG_ADDRESS")'
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
import { VendorLocation } from 'src/store/goods/types'

interface Props {
  inputCountry: string
  inputProvince: string
  inputCity: string
  inputAddress: string
}

const props = withDefaults(defineProps<Props>(), {
  inputCountry: '',
  inputProvince: '',
  inputCity: '',
  inputAddress: ''
})

const inputCountry = toRef(props, 'inputCountry')
const inputProvince = toRef(props, 'inputProvince')
const inputCity = toRef(props, 'inputCity')
const inputAddress = toRef(props, 'inputAddress')

const myCountry = ref(inputCountry.value)
const myProvince = ref(inputProvince.value)
const myCity = ref(inputCity.value)
const myAddress = ref(inputAddress.value)

const emit = defineEmits<{(e: 'submit', info: VendorLocation): void,
  (e: 'update:inputCountry', type: string): void
  (e: 'update:inputProvince', type: string): void
  (e: 'update:inputCity', type: string): void
  (e: 'update:inputAddress', type: string): void
}>()

const onSubmit = () => {
  emit('submit', {
    Country: myCountry.value,
    Province: myProvince.value,
    City: myCity.value,
    Address: myAddress.value
  })
}

watch(myCountry, function (val) {
  emit('update:inputCountry', val)
})

watch(myProvince, function (val) {
  emit('update:inputProvince', val)
})

watch(myCity, function (val) {
  emit('update:inputCity', val)
})

watch(myAddress, function (val) {
  emit('update:inputAddress', val)
})

</script>

<style lang='sass' scoped>
.submit-btn
  margin-top: 24px
  background-color: $blue-6
  color: white
</style>
