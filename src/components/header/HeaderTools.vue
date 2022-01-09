<template>
  <div class='row'>
    <HeaderToolBtn />
    <Avatar />
  </div>
</template>

<script setup lang='ts'>
import { defineAsyncComponent } from 'vue'

const Avatar = defineAsyncComponent(() => import('src/components/avatar/Avatar.vue'))
const HeaderToolBtn = defineAsyncComponent(() => import('src/components/header/HeaderToolBtn.vue'))

</script>
