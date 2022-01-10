<template>
  <q-btn-dropdown
    split
    icon='pending'
    no-caps
    :label='selectedAppName'
  >
    <q-list>
      <q-item
        v-for='application in applications'
        :key='application.ID'
        v-close-popup
        clickable
        @click='onItemClick(application)'
      >
        <q-item-section avatar>
          <q-avatar :icon='applicationLogo(application)' />
        </q-item-section>
        <q-item-label>{{ application.ApplicationName }}</q-item-label>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script setup lang='ts'>
import { computed, withDefaults, defineProps, defineEmits, toRef } from 'vue'

import { useStore } from 'src/store'
import { Application } from 'src/store/applications/types'
import { AppID } from 'src/const/const'

interface Props {
  selectedAppId: string
}

const props = withDefaults(defineProps<Props>(), {
  selectedAppId: AppID
})

const selectedAppId = toRef(props, 'selectedAppId')
const emit = defineEmits<{(e: 'update:selectedAppId', value: string): void }>()

const store = useStore()

const defaultApplicationLogo = 'pending'
const applications = computed(() => store.getters.getApplications)
const applicationLogo = (application: Application) => {
  return application.ApplicationLogo === '' ? defaultApplicationLogo : 'img:' + application.ApplicationLogo
}

const selectedAppName = computed(() => {
  const application = store.getters.getApplicationByID(selectedAppId.value)
  if (application) {
    return store.getters.getApplicationByID(selectedAppId.value).ApplicationName
  }
  return selectedAppId.value
})

const onItemClick = (application: Application) => {
  emit('update:selectedAppId', application.ID)
}

</script>
