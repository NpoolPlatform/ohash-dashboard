<template>
  <q-card>
    <q-card-section>
      <q-item-label>{{ $t('MSG_CREATE_COININFO') }}</q-item-label>
    </q-card-section>
    <q-item-section>
      <q-input
        v-model='name'
        :label='$t("MSG_DISPLAY_NAME")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <q-input
        v-model='unit'
        :label='$t("MSG_UNIT")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <q-input
        v-model='logo'
        :label='$t("MSG_LOGO")'
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
import { defineEmits, watch, computed, ref } from 'vue'
import { Coin } from 'src/store/coins/types'

const name = ref('')
const unit = ref('')
const logo = ref('')

const coin = computed(() => {
  return {
    Name: name.value,
    Unit: unit.value,
    Logo: logo.value,
    PreSale: true,
    ENV: 'main'
  } as Coin
})

const emit = defineEmits<{(e: 'submit', info: Coin): void,
  (e: 'update', info: Coin): void
}>()

const onSubmit = () => {
  emit('submit', coin.value)
}

watch(coin.value, function () {
  emit('update', coin.value)
})

</script>

<style lang='sass' scoped>
.submit-btn
  margin-top: 24px
  background-color: $blue-6
  color: white
</style>
