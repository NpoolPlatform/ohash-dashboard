<template>
  <q-card class='container'>
    <q-card-section>
      <q-item-label>{{ $t('MSG_CREATE_APP_CONTACT') }}</q-item-label>
    </q-card-section>
    <q-item-section>
      <q-item>
        <q-item-label>{{ $t('MSG_APP_NAME') }}: {{ selectedApp?.App.Name }}</q-item-label>
      </q-item>
      <q-input
        v-model='account'
        :label='$t("MSG_ACCOUNT")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <q-input
        v-model='accountType'
        :label='$t("MSG_ACCOUNT_TYPE")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <q-input
        v-model='sender'
        :label='$t("MSG_SENDER")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <q-input
        v-model='usedFor'
        :label='$t("MSG_USED_FOR")'
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
import { AppContact } from 'src/store/appcontacts/types'

interface Props {
  editContact?: AppContact
}

const props = defineProps<Props>()

const editContact = toRef(props, 'editContact')

const editContactAccount = computed(() => {
  return editContact.value ? editContact.value.Account : ''
})
const account = ref(editContactAccount.value)

const editContactSender = computed(() => {
  return editContact.value ? editContact.value.Sender : ''
})
const sender = ref(editContactSender.value)

const editContactAccountType = computed(() => {
  return editContact.value ? editContact.value.AccountType : ''
})
const accountType = ref(editContactAccountType.value)

const editContactUsedFor = computed(() => {
  return editContact.value ? editContact.value.UsedFor : ''
})
const usedFor = ref(editContactUsedFor.value)

const editContactID = computed(() => {
  return editContact.value ? editContact.value.ID : undefined
})
const id = ref(editContactID.value)

const template = computed(() => {
  return {
    ID: id.value as string,
    Account: account.value,
    AccountType: accountType.value,
    UsedFor: usedFor.value,
    Sender: sender.value
  } as AppContact
})

watch(template, () => {
  emit('update', template.value)
})

const emit = defineEmits<{(e: 'submit', info: AppContact): void,
  (e: 'update', info: AppContact): void
}>()

const onSubmit = () => {
  emit('submit', template.value)
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
