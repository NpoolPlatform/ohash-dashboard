<template>
  <q-drawer v-model='leftDrawerOpen' :mini='leftDrawerMini' show-if-above bordered>
    <div class='row'>
      <q-space />
      <q-btn
        flat dense round icon='swap_horiz'
        aria-label='Menu'
        class='drawer-toggle'
        @click='toggleLeftDrawer'
      />
    </div>
    <q-list>
      <DrawerItem v-for='item in drawerItems' :key='item.title' v-bind='item' />
    </q-list>
  </q-drawer>
</template>
<script setup lang='ts'>
import { ref, defineAsyncComponent } from 'vue'

const DrawerItem = defineAsyncComponent(() => import('src/components/drawer/Item.vue'))

const leftDrawerOpen = ref(true)
const leftDrawerMini = ref(false)

const toggleLeftDrawer = (): void => {
  leftDrawerMini.value = !leftDrawerMini.value
}

const drawerItems = [
  {
    title: '语言包',
    caption: '管理国际化语言包',
    icon: 'language',
    link: 'https://github.com'
  }
]

</script>
<style lang='sass' scoped>
.drawer-toggle
  margin-left: auto
  margin-right: auto
</style>
