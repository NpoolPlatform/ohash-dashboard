<template>
  <q-item clickable :target='target' class='item-container'>
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
import { defineProps, withDefaults, toRef } from 'vue'

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

</script>

<style lang='sass' scoped>
.item-container
  height: 56px
</style>
