<template>
  <div class='q-pa-md q-gutter-sm breadcrumbs'>
    <q-breadcrumbs separator='>'>
      <q-breadcrumbs-el
        v-for='(router, index) in routers'
        :key='router.label'
        :icon='router.icon'
        :to='router.target'
        :label='router.label'
        @click='onItemClick(index)'
      />
    </q-breadcrumbs>
  </div>
</template>

<script setup lang='ts'>
import { computed } from 'vue'

import { useStore } from 'src/store'
import { MutationTypes } from 'src/store/main-breadcrumbs/mutation-types'

const store = useStore()
const routers = computed(() => store.getters.getMainBreadcrumbsInfos)

const onItemClick = (index: number) => {
  store.commit(MutationTypes.SetMainBreadcrumbs, routers.value.filter((item, idx) => {
    return idx <= index
  }))
}

</script>

<style lang='sass' scoped>
.breadcrumbs
  border-bottom: solid 1px $grey-4
</style>
