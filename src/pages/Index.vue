<template>
  <q-page class='row items-center justify-evenly'>
    HHHHHHHHHHHHHHHHHHHHH
  </q-page>
</template>

<script setup lang='ts'>
import { computed, onMounted } from 'vue'
import { useStore } from 'src/store'
import { useRouter } from 'vue-router'

const store = useStore()
const loggined = computed(() => store.getters.getLogined)

const router = useRouter()

onMounted(() => {
  if (!loggined.value) {
    void router.push('/login')
  }
})

</script>
