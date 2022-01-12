<template>
  <q-card>
    <q-card-section>
      <q-item-label>{{ $t('MSG_CREATE_FEE_TYPE') }}</q-item-label>
    </q-card-section>
    <q-item-section>
      <q-input
        v-model='myFeeType'
        :label='$t("MSG_FEE_TYPE")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <q-input
        v-model='myFeeDescription'
        :label='$t("MSG_FEE_TYPE_DESCRIPTION")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <div>
        <q-btn-toggle
          v-model='myPayType'
          no-caps
          rounded
          unelevated
          class='toggle-btn'
          :options='payTypes'
        />
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
import { ref, defineEmits, watch, withDefaults, defineProps, toRef } from 'vue'
import { FeeType } from 'src/store/goods/types'
import { useI18n } from 'vue-i18n'

interface Props {
  inputFeeType: string
  inputFeeDescription: string
  inputPayType: string
}

const props = withDefaults(defineProps<Props>(), {
  inputFeeType: '',
  inputFeeDescription: '',
  inputPayType: ''
})

const inputFeeType = toRef(props, 'inputFeeType')
const inputFeeDescription = toRef(props, 'inputFeeDescription')

const myFeeType = ref(inputFeeType.value)
const myFeeDescription = ref(inputFeeDescription.value)
const myPayType = ref('amount')

// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const payTypes = [
  {
    label: t('MSG_PAY_TYPE_AMOUNT'),
    value: 'amount'
  }, {
    label: t('MSG_PAY_TYPE_PERCENT'),
    value: 'percent'
  }
]

const emit = defineEmits<{(e: 'submit', info: FeeType): void,
  (e: 'update:inputFeeType', type: string): void
  (e: 'update:inputFeeDescription', type: string): void
  (e: 'update:inputPayType', type: string): void
}>()

const onSubmit = () => {
  emit('submit', {
    FeeType: myFeeType.value,
    FeeDescription: myFeeDescription.value,
    PayType: myPayType.value
  })
}

watch(myFeeType, function (val) {
  emit('update:inputFeeType', val)
})

watch(myFeeDescription, function (val) {
  emit('update:inputFeeDescription', val)
})

watch(myPayType, function (val) {
  emit('update:inputPayType', val)
})

</script>

<style lang='sass' scoped>
.submit-btn
  margin-top: 24px
  background-color: $blue-6
  color: white

.toggle-btn
  border: 1px solid #027be3
</style>
