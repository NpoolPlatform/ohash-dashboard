<template>
  <q-card class='container'>
    <q-card-section>
      <q-item-label>{{ $t('MSG_CREATE_ANNOUNCEMENT') }}</q-item-label>
    </q-card-section>
    <q-item-section>
      <q-input
        v-model='myTitle'
        :label='$t("MSG_TITLE")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <q-input
        v-model='myContent'
        :label='$t("MSG_CONTENT")'
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
import { defineProps, toRef, computed, defineEmits, watch, ref } from 'vue'
import { Announcement } from 'src/store/mailbox/types'

interface Props {
  editAnnouncement?: Announcement
}

const props = defineProps<Props>()

const editAnnouncement = toRef(props, 'editAnnouncement')

const editTitle = computed(() => {
  return editAnnouncement.value ? editAnnouncement.value.Title : ''
})
const myTitle = ref(editTitle.value)

const editContent = computed(() => {
  return editAnnouncement.value ? editAnnouncement.value.Content : ''
})
const myContent = ref(editContent.value)

const editID = computed(() => {
  return editAnnouncement.value ? editAnnouncement.value.ID : undefined
})
const id = ref(editID.value)

const announcement = computed(() => {
  return {
    ID: id.value as string,
    Title: myTitle.value,
    Content: myContent.value
  } as Announcement
})

watch(announcement, () => {
  emit('update', announcement.value)
})

const emit = defineEmits<{(e: 'submit', info: Announcement): void,
  (e: 'update', info: Announcement): void
}>()

const onSubmit = () => {
  emit('submit', announcement.value)
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
