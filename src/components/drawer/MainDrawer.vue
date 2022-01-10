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
    <q-list separator>
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
import { HomePageBreadcrumbs } from 'src/store/main-breadcrumbs/state'
import { ref, defineAsyncComponent, computed, onMounted, onUnmounted } from 'vue'
import { useStore } from 'src/store'
import { FunctionVoid } from 'src/types/types'
import { useRouter } from 'vue-router'

import { MutationTypes as MainBreadcrumbsMutationTypes } from 'src/store/main-breadcrumbs/mutation-types'
import { MutationTypes as UserMutationTypes } from 'src/store/user-helper/mutation-types'
import { MenuItem, MainDrawerMenus } from 'src/menus/menus'

const store = useStore()
const router = useRouter()

const DrawerMenu = defineAsyncComponent(() => import('src/components/drawer/DrawerMenu.vue'))

const logined = computed(() => store.getters.getLogined)

const leftDrawerOpen = ref(true)
const leftDrawerMini = ref(!logined.value)

const toggleLeftDrawer = (): void => {
  if (!logined.value) {
    return
  }
  leftDrawerMini.value = !leftDrawerMini.value
}

const onItemClick = (item: MenuItem) => {
  if (!logined.value) {
    return
  }
  store.commit(MainBreadcrumbsMutationTypes.SetMainBreadcrumbs,
    [
      HomePageBreadcrumbs,
      {
        menuId: item.menuId,
        label: item.label,
        caption: item.caption,
        icon: item.icon,
        target: item.target,
        level: item.level
      }
    ]
  )

  if (item.children.length === 0) {
    void router.push(item.target)
  }
}

const unsubscribe = ref<FunctionVoid>()

onMounted(() => {
  unsubscribe.value = store.subscribe((mutation) => {
    if (mutation.type === UserMutationTypes.SetLoginedUser) {
      leftDrawerMini.value = !logined.value
    }
  })
})

onUnmounted(() => {
  unsubscribe.value?.()
})

const drawerItems: Array<MenuItem> = MainDrawerMenus

</script>
<style lang='sass' scoped>
.drawer-toggle
  margin-left: auto
  margin-right: auto
</style>
