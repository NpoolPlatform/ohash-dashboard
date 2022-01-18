<template>
  <q-page class='row items-center justify-evenly' />
</template>

<script setup lang='ts'>
import { useI18n } from 'vue-i18n'
// eslint-disable-next-line @typescript-eslint/unbound-method
const { messages } = useI18n({ useScope: 'global' })

console.log(messages.value)

</script>
