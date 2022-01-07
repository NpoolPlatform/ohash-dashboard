<template>
  <q-layout view='hHh Lpr lFf'>
    <MainHeader />
    <Drawer />

    <q-page-container>
      <MainBreadcrumbs />
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang='ts'>
import { defineAsyncComponent } from 'vue'

const MainHeader = defineAsyncComponent(() => import('src/components/header/MainHeader.vue'))
const Drawer = defineAsyncComponent(() => import('src/components/drawer/Drawer.vue'))
const MainBreadcrumbs = defineAsyncComponent(() => import('src/components/breadcrumbs/MainBreadcrumbs.vue'))

</script>
