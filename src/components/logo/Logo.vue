<template>
  <q-img src='../../../public/logos/logo.png' class='logo-icon' />
  <q-toolbar-title v-if='!logoOnly' class='logo-name'>
    {{ productName }} {{ version }}
  </q-toolbar-title>
</template>

<script setup lang='ts'>
import { defineProps, withDefaults, toRef } from 'vue'
import { productName, version } from '../../../package.json'

interface Props {
  logoOnly: boolean
}

const props = withDefaults(defineProps<Props>(), {
  logoOnly: false
})

const logoOnly = toRef(props, 'logoOnly')

</script>

<style lang='sass' scoped>
.logo-name
  font-weight: bold
  color: black

.logo-icon
  width: 80px
</style>
