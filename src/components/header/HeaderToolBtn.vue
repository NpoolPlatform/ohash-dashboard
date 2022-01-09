<template>
  <q-btn flat dense round :icon='icon' />
</template>

<script setup lang='ts'>
import { defineProps, withDefaults, computed } from 'vue'

interface Props {
  icon: string
}

const props = withDefaults(defineProps<Props>(), {
  icon: 'icons/github.png'
})

const icon = computed(() => 'img:' + props.icon)

</script>

<style lang='sass' scoped>
.btn-icon
  background-color: red
</style>
