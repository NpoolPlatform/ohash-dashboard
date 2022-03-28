<template>
  <q-table
    v-model:selected='selectedUsers'
    flat
    dense
    :loading='loading'
    :rows='myUsers'
    selection='multiple'
    row-key='ID'
  >
    <template #top-right>
      <q-space />
      <q-input v-model='userPattern' />
    </template>
  </q-table>
  <q-table
    flat
    dense
    :rows='codes'
  >
    <template #top-right>
      <div class='row'>
        <q-space />
        <q-btn :label='t("MSG_CREATE")' @click='onCreateInvitationCode' />
      </div>
    </template>
  </q-table>
</template>

<script setup lang='ts'>
import { onMounted, computed, ref, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from 'src/store'
import { ActionTypes as InspireActionTypes } from 'src/store/inspire/action-types'
import { ModuleKey, Type as NotificationType } from 'src/store/notifications/const'
import { FunctionVoid } from 'src/types/types'
import { MutationTypes as InspireMutationTypes } from 'src/store/inspire/mutation-types'
import { ActionTypes as UserActionTypes } from 'src/store/user-helper/action-types'
import { AppUser } from 'src/store/user-helper/types'

const store = useStore()
// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const users = computed(() => store.getters.getAppUserInfos)
const userPattern = ref('')
const myUsers = computed(() => {
  const allUsers = [] as Array<AppUser>
  if (users.value) {
    users.value.forEach((user) => {
      allUsers.push(user.User as AppUser)
    })
  }
  return allUsers.filter((user) => user.EmailAddress?.includes(userPattern.value))
})
const codes = computed(() => store.getters.getUserInvitationCodes)

const loading = ref(false)
const selectedUsers = ref([] as Array<AppUser>)

const unsubscribe = ref<FunctionVoid>()

const onCreateInvitationCode = () => {
  selectedUsers.value.forEach((user) => {
    store.dispatch(InspireActionTypes.CreateUserInvitationCodeForAppOtherUser, {
      TargetUserID: user.ID as string,
      Info: {
        UserID: user.ID as string
      },
      Message: {
        ModuleKey: ModuleKey.ModuleUsers,
        Error: {
          Title: t('MSG_CREATE_USER_INVITATION_CODE_FAIL'),
          Popup: true,
          Type: NotificationType.Error
        }
      }
    })
  })
}

onMounted(() => {
  store.dispatch(UserActionTypes.GetAppUserInfos, {
    Message: {
      ModuleKey: ModuleKey.ModuleUsers,
      Error: {
        Title: t('MSG_GET_APP_USER_INFOS_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })

  store.dispatch(InspireActionTypes.GetUserInvitationCodes, {
    Message: {
      ModuleKey: ModuleKey.ModuleUsers,
      Error: {
        Title: t('MSG_GET_USER_INVITATION_CODES_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })

  unsubscribe.value = store.subscribe((mutation) => {
    if (mutation.type === InspireMutationTypes.SetUserInvitationCodes) {
      loading.value = false
    }
  })
})

onUnmounted(() => {
  unsubscribe.value?.()
})

</script>
