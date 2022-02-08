<template>
  <q-card class='container'>
    <q-card-section>
      <q-item-label>{{ $t('MSG_CREATE_ROLE') }}</q-item-label>
    </q-card-section>
    <q-item-section>
      <q-item>
        <q-item-label>{{ $t('MSG_APP_NAME') }}: {{ selectedApp?.App.Name }}</q-item-label>
      </q-item>
      <q-item>
        <q-item-label>{{ $t('MSG_CREATEOR') }}: {{ createdBy }}</q-item-label>
      </q-item>
      <q-input
        v-model='role'
        :label='$t("MSG_ROLE")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <q-input
        v-model='description'
        :label='$t("MSG_DESCRIPTION")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <q-toggle
        v-model='defaultRole'
        :label='$t("MSG_DEFAULT")'
      />
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
import { AppRole } from 'src/store/user-helper/types'
import { useStore } from 'src/store'

interface Props {
  editRole?: AppRole
}

const props = defineProps<Props>()
const store = useStore()

const editRole = toRef(props, 'editRole')
const userInfo = computed(() => store.getters.getLoginedUser)

const editRoleCreatedBy = computed(() => {
  return editRole.value ? editRole.value.CreatedBy : userInfo.value.User?.ID
})
const createdBy = ref(editRoleCreatedBy.value)

const editRoleRole = computed(() => {
  return editRole.value ? editRole.value.Role : ''
})
const role = ref(editRoleRole.value)

const editRoleDescription = computed(() => {
  return editRole.value ? editRole.value.Description : ''
})
const description = ref(editRoleDescription.value)

const editRoleDefault = computed(() => {
  return editRole.value ? editRole.value.Default : false
})
const defaultRole = ref(editRoleDefault.value)

const editRoleID = computed(() => {
  return editRole.value ? editRole.value.ID : undefined
})
const id = ref(editRoleID.value)

const appRole = computed(() => {
  return {
    ID: id.value as string,
    CreatedBy: createdBy.value,
    Role: role.value,
    Description: description.value,
    Default: defaultRole.value
  } as AppRole
})

watch(role, () => {
  emit('update', appRole.value)
})

const emit = defineEmits<{(e: 'submit', info: AppRole): void,
  (e: 'update', info: AppRole): void
}>()

const onSubmit = () => {
  emit('submit', appRole.value)
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
