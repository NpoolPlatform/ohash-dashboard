<template>
  <q-card class='container'>
    <q-card-section>
      <q-item-label>{{ $t('MSG_ADD_LANGUAGE') }}</q-item-label>
    </q-card-section>
    <q-item-section>
      <q-input
        v-model='name'
        :label='$t("MSG_DISPLAY_NAME")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <q-input
        v-model='logo'
        :label='$t("MSG_LOGO")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <q-input
        v-model='description'
        :label='$t("MSG_DESCRIPTION")'
        type='textarea'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
    </q-item-section>
    <q-item-section>
      <q-btn
        class='submit-btn'
        :label='$t("MSG_SUBMIT")'
        @click='onSubmit'
      />
    </q-item-section>
  </q-card>
</template>

<script setup lang='ts'>
import { computed, defineEmits, watch, ref } from 'vue'
import { App } from 'src/store/applications/types'
import { useStore } from 'src/store'

const store = useStore()

const name = ref('')
const logo = ref('')
const description = ref('')

const userID = computed(() => store.getters.getLoginedUser.User?.ID)

const application = computed(() => {
  return {
    CreatedBy: userID.value,
    Name: name.value,
    Logo: logo.value,
    Description: description.value
  } as App
})

watch(application, () => {
  emit('update', application.value)
})

const emit = defineEmits<{(e: 'submit', info: App): void,
  (e: 'update', info: App): void
}>()

const onSubmit = () => {
  emit('submit', application.value)
}

</script>

<style lang='sass' scoped>
.container
  padding: 24px
  min-width: 800px

.submit-btn
  margin-top: 24px
  background-color: $blue-6
  color: white
</style>
