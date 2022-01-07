<template>
  <q-layout view='hHh Lpr lFf'>
    <MainHeader />
    <MainDrawer />

    <q-page-container>
      <MainBreadcrumbs />
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang='ts'>
import { defineAsyncComponent } from 'vue'

const MainHeader = defineAsyncComponent(() => import('src/components/header/MainHeader.vue'))
const MainDrawer = defineAsyncComponent(() => import('src/components/drawer/MainDrawer.vue'))
const MainBreadcrumbs = defineAsyncComponent(() => import('src/components/breadcrumbs/MainBreadcrumbs.vue'))

</script>
