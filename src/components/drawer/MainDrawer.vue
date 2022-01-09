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
import { ref, defineAsyncComponent, computed, onMounted, onUnmounted } from 'vue'
import { useStore } from 'src/store'
import { FunctionVoid } from 'src/types/types'

import { MutationTypes as MainBreadcrumbsMutationTypes } from 'src/store/main-breadcrumbs/mutation-types'
import { MutationTypes as UserMutationTypes } from 'src/store/user-helper/mutation-types'

const store = useStore()

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

const onItemClick = (item: MainBreadcrumbs) => {
  if (!logined.value) {
    return
  }
  store.commit(MainBreadcrumbsMutationTypes.SetMainBreadcrumbs,
    [
      HomePageBreadcrumbs,
      {
        label: item.label,
        caption: item.caption,
        icon: item.icon,
        target: item.target
      }
    ]
  )
}

const unsubscribe = ref<FunctionVoid>()

onMounted(() => {
  unsubscribe.value = store.subscribe((mutation) => {
    if (mutation.type === UserMutationTypes.SetUserInfo) {
      leftDrawerMini.value = !logined.value
    }
  })
})

onUnmounted(() => {
  unsubscribe.value?.()
})

interface MenuItem {
  label: string
  caption: string
  icon: string
  target: string
  level: number
  children: Array<MenuItem>
}

const drawerItems: Array<MenuItem> = [
  {
    label: '语言包',
    caption: '管理国际化语言包',
    icon: 'language',
    target: 'https://github.com',
    level: 0,
    children: [
      {
        label: '添加文案',
        caption: '添加多国语言文案',
        icon: 'language',
        target: 'https://github.com',
        level: 1,
        children: []
      }, {
        label: '修改文案',
        caption: '修改多国语言文案',
        icon: 'language',
        target: 'https://github.com',
        level: 1,
        children: []
      }
    ]
  }, {
    label: '商品',
    caption: '管理算力商品',
    icon: 'format_list_numbered',
    target: 'https://github.com',
    level: 0,
    children: []
  }
]

</script>
<style lang='sass' scoped>
.drawer-toggle
  margin-left: auto
  margin-right: auto
</style>
