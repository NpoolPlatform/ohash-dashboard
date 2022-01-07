<template>
  <q-item
    v-ripple
    clickable
    :target='target'
    class='item-container'
    active-class='drawer-active'
    :active='itemActive'
    @click='onItemClick()'
  >
    <q-item-section v-if='icon' avatar>
      <q-icon :name='icon' />
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ label }}</q-item-label>
      <q-item-label caption>
        {{ caption }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang='ts'>
import { defineProps, withDefaults, toRef, computed } from 'vue'
import { useStore } from 'src/store'
import { MutationTypes } from 'src/store/main-breadcrumbs/mutation-types'

interface Props {
  label: string
  caption: string
  target: string
  icon: string
}
const props = withDefaults(defineProps<Props>(), {
  label: '',
  caption: '',
  target: '#',
  icon: ''
})
const label = toRef(props, 'label')
const caption = toRef(props, 'caption')
const target = toRef(props, 'target')
const icon = toRef(props, 'icon')

const store = useStore()
const active = computed({
  get: () => store.getters.getActiveBreadcrumbs,
  set: (val) => {
    store.commit(MutationTypes.SetActiveBreadcrumbs, val)
  }
})

const itemActive = computed(() => {
  return active.value.label === label.value
})

const onItemClick = () => {
  active.value = {
    label: label.value,
    caption: caption.value,
    target: target.value,
    icon: icon.value
  }
}

</script>

<style lang='sass' scoped>
.item-container
  height: 56px

.drawer-active
  background-color: $grey-4
</style>
