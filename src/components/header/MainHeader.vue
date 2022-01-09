<template>
  <q-header class='header'>
    <q-toolbar>
      <Logo />
    </q-toolbar>
  </q-header>
</template>

<script setup lang='ts'>
import { defineAsyncComponent } from 'vue'

const Logo = defineAsyncComponent(() => import('src/components/logo/Logo.vue'))
</script>

<style lang='sass' scoped>
.header
  background-color: white
  border-bottom: solid 1px $grey-4
  height: 48px
</style>
