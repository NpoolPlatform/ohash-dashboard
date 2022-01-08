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
import { defineAsyncComponent, onBeforeMount } from 'vue'
import { AppID } from '../const/const'
import { useQuasar } from 'quasar'

const MainHeader = defineAsyncComponent(() => import('src/components/header/MainHeader.vue'))
const MainDrawer = defineAsyncComponent(() => import('src/components/drawer/MainDrawer.vue'))
const MainBreadcrumbs = defineAsyncComponent(() => import('src/components/breadcrumbs/MainBreadcrumbs.vue'))

const q = useQuasar()

onBeforeMount(() => {
  // TODO: use dashboard app id
  q.cookies.set('AppID', AppID)
})

</script>
