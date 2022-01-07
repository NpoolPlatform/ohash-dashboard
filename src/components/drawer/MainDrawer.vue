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
      <DrawerMenu
        v-for='item in drawerItems'
        :key='item.label'
        v-bind='item'
        @click='onItemClick(item)'
      />
    </q-list>
  </q-drawer>
</template>
<script setup lang='ts'>
import { MainBreadcrumbs } from 'src/store/main-breadcrumbs/types'
import { HomePageBreadcrumbs } from 'src/store/main-breadcrumbs/state'
import { ref, defineAsyncComponent } from 'vue'
import { useStore } from 'src/store'

import { MutationTypes } from 'src/store/main-breadcrumbs/mutation-types'

const store = useStore()

const DrawerMenu = defineAsyncComponent(() => import('src/components/drawer/DrawerMenu.vue'))

const leftDrawerOpen = ref(true)
const leftDrawerMini = ref(false)

const toggleLeftDrawer = (): void => {
  leftDrawerMini.value = !leftDrawerMini.value
}

const onItemClick = (item: MainBreadcrumbs) => {
  store.commit(MutationTypes.SetMainBreadcrumbs, [HomePageBreadcrumbs, item])
}

const drawerItems: Array<MainBreadcrumbs> = [
  {
    label: '语言包',
    caption: '管理国际化语言包',
    icon: 'language',
    target: 'https://github.com'
  }, {
    label: '商品',
    caption: '管理算力商品',
    icon: 'format_list_numbered',
    target: 'https://github.com'
  }
]

</script>
<style lang='sass' scoped>
.drawer-toggle
  margin-left: auto
  margin-right: auto
</style>
