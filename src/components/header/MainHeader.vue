<template>
  <q-header elevated class='header'>
    <q-toolbar>
      <q-img src='../../../public/logos/logo.png' class='header-icon' />
      <q-toolbar-title class='header-name'>
        {{ productName }} {{ version }}
      </q-toolbar-title>
    </q-toolbar>
  </q-header>
</template>

<script setup lang='ts'>
import { productName, version } from '../../../package.json'
</script>

<style lang='sass' scoped>
.header
  background-color: white

.header-name
  font-weight: bold
  color: black

.header-icon
  height: 48px
  width: 80px
</style>
