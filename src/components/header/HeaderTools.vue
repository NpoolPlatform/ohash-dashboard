<template>
  <div class='row'>
    <HeaderToolBtn icon='icons/github.png' @click='onGithubClick' />
    <Avatar v-if='logined' />
  </div>
</template>

<script setup lang='ts'>
import { defineAsyncComponent, computed } from 'vue'
import { useStore } from '../../store'

const Avatar = defineAsyncComponent(() => import('src/components/avatar/Avatar.vue'))
const HeaderToolBtn = defineAsyncComponent(() => import('src/components/header/HeaderToolBtn.vue'))

const store = useStore()
const logined = computed(() => store.getters.getLogined)

const onGithubClick = () => {
  window.open('https://github.com')
}

</script>
