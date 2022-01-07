<template>
  <div class='q-pa-md q-gutter-sm breadcrumbs-container'>
    <q-breadcrumbs
      separator='>'
      class='breadcrumbs'
    >
      <q-breadcrumbs-el
        v-for='router in routers'
        :key='router.label'
        :icon='router.icon'
        :to='router.target'
        :label='router.label'
      />
    </q-breadcrumbs>
  </div>
</template>

<script setup lang='ts'>
import { computed } from 'vue'

import { useStore } from 'src/store'

const store = useStore()
const routers = computed(() => store.getters.getMainBreadcrumbs)

</script>

<style lang='sass' scoped>
.breadcrumbs-container
  border-bottom: solid 1px $grey-4
  padding: 0 0 0 10px
  margin: 3px 0 3px 0

.breadcrumbs
  padding: 0
  margin: 0
</style>
