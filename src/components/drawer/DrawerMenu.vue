<template>
  <q-expansion-item
    v-if='children.length > 0'
    :key='label'
    :label='label'
    :content-inset-level='insetLevel'
    :icon='icon'
    :caption='caption'
    class='item-container'
    @click='onItemClick()'
  >
    <drawer-menu
      v-for='item in children'
      :key='item.label'
      v-bind='item'
    />
  </q-expansion-item>
  <q-item
    v-else
    v-ripple
    clickable
    :target='target'
    class='item-container'
    :active='itemActive'
    @click='onItemClick()'
  >
    <q-item-section v-if='icon' avatar>
      <q-icon :name='icon' />
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ label }}</q-item-label>
      <q-item-label v-if='caption !== ""' caption>
        {{ caption }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang='ts'>
import { defineProps, toRef, computed } from 'vue'
import { useStore } from 'src/store'
import { MutationTypes } from 'src/store/main-breadcrumbs/mutation-types'
import { MainBreadcrumbs } from 'src/store/main-breadcrumbs/types'
import { useRouter } from 'vue-router'

interface Props {
  menuId?: number
  label?: string
  caption?: string
  target?: string
  icon?: string
  level?: number
  children?: Array<MainBreadcrumbs>
}
const props = defineProps<Props>()

const label = toRef(props, 'label')
const caption = toRef(props, 'caption')
const target = toRef(props, 'target')
const icon = toRef(props, 'icon')
const menuId = toRef(props, 'menuId')
const level = computed(() => {
  return props.level === undefined ? 0 : props.level
})
const insetLevel = computed(() => {
  return props.level === undefined ? 0 : props.level * 0.1 + 0.3
})
const children = computed(() => {
  return props.children === undefined ? [] : props.children
})

const store = useStore()
const router = useRouter()

const active = computed({
  get: () => store.getters.getActiveBreadcrumbs,
  set: (val) => {
    store.commit(MutationTypes.SetActiveBreadcrumbs, val)
  }
})

const itemActive = computed(() => {
  return active.value.label === label.value && active.value.level === level.value && active.value.menuId === menuId.value
})

const loggined = computed(() => store.getters.getLogined)

const onItemClick = () => {
  if (!loggined.value) {
    return
  }
  active.value = {
    menuId: menuId.value,
    label: label.value,
    caption: caption.value,
    target: target.value,
    icon: icon.value,
    level: level.value
  } as MainBreadcrumbs

  const curMainBreadcrumbs = store.state.mainBreadcrumbs.Infos
  const newMainBreadcrumbs: Array<MainBreadcrumbs> = curMainBreadcrumbs.filter((_, index) => {
    return index <= level.value
  })

  newMainBreadcrumbs.push(active.value)
  store.commit(MutationTypes.SetMainBreadcrumbs, newMainBreadcrumbs)

  if (children.value.length === 0) {
    void router.push(active.value.target)
  }
}

</script>

<style lang='sass' scoped>
.item-container
  line-height: 56px
</style>
