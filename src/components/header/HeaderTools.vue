<template>
  <div class='row'>
    <HeaderToolBtn icon='icons/github.png' @click='onGithubClick' />
    <Avatar />
  </div>
</template>

<script setup lang='ts'>
import { defineAsyncComponent } from 'vue'

const Avatar = defineAsyncComponent(() => import('src/components/avatar/Avatar.vue'))
const HeaderToolBtn = defineAsyncComponent(() => import('src/components/header/HeaderToolBtn.vue'))

const onGithubClick = () => {
  window.open('https://github.com')
}

</script>
