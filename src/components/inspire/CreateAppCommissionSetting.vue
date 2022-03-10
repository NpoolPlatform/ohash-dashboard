<template>
  <q-card class='container'>
    <q-card-section>
      <q-item-label>{{ $t('MSG_CREATE_APP_COMMISSION_SETTING') }}</q-item-label>
    </q-card-section>
    <q-item-section>
      <q-input
        v-model='type'
        :label='$t("MSG_TYPE")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <q-input
        v-model='level'
        :label='$t("MSG_LEVEL")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <q-toggle
        v-model='invitationDiscount'
        :label='$t("MSG_INVITATION_DISCOUNT")'
      />
      <q-toggle
        v-model='uniqueSetting'
        :label='$t("MSG_USER_UNIQUE_SETTING")'
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
import { AppCommissionSetting } from 'src/store/inspire/types'

interface Props {
  editSetting?: AppCommissionSetting
}

const props = defineProps<Props>()

const editSetting = toRef(props, 'editSetting')

const editType = computed(() => {
  return editSetting.value ? editSetting.value.Type : 'commission-by-amount'
})
const type = ref(editType.value)

const editLevel = computed(() => {
  return editSetting.value ? editSetting.value.Level : 1
})
const level = ref(editLevel.value)

const editInvitationDiscount = computed(() => {
  return editSetting.value ? editSetting.value.InvitationDiscount : false
})
const invitationDiscount = ref(editInvitationDiscount.value)

const editUniqueSetting = computed(() => {
  return editSetting.value ? editSetting.value.UniqueSetting : true
})
const uniqueSetting = ref(editUniqueSetting.value)

const editID = computed(() => {
  return editSetting.value ? editSetting.value.ID : undefined
})
const id = ref(editID.value)

const setting = computed(() => {
  return {
    ID: id.value as string,
    Type: type.value,
    Level: level.value,
    InvitationDiscount: invitationDiscount.value,
    UniqueSetting: uniqueSetting.value
  } as AppCommissionSetting
})

watch(setting, () => {
  emit('update', setting.value)
})

const emit = defineEmits<{(e: 'submit', info: AppCommissionSetting): void,
  (e: 'update', info: AppCommissionSetting): void
}>()

const onSubmit = () => {
  emit('submit', setting.value)
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
