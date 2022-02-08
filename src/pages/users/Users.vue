<template>
  <q-table
    flat
    dense
    :loading='loading'
    :rows='myUsers'
  />
</template>

<script setup lang='ts'>
import { onMounted, computed, ref, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from 'src/store'
import { ActionTypes as UserActionTypes } from 'src/store/user-helper/action-types'
import { ModuleKey, Type as NotificationType } from 'src/store/notifications/const'
import { FunctionVoid } from 'src/types/types'
import { MutationTypes as UserMutationTypes } from 'src/store/user-helper/mutation-types'
import { AppUser } from 'src/store/user-helper/types'

const store = useStore()
// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const users = computed(() => store.getters.getAppUserInfos)
const myUsers = computed(() => {
  const allUsers = [] as Array<AppUser>
  if (users.value) {
    users.value.forEach((user) => {
      allUsers.push(user.User as AppUser)
    })
  }
  return allUsers
})

const loading = ref(false)

const unsubscribe = ref<FunctionVoid>()

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

  unsubscribe.value = store.subscribe((mutation) => {
    if (mutation.type === UserMutationTypes.SetAppUserInfos) {
      loading.value = false
    }
  })
})

onUnmounted(() => {
  unsubscribe.value?.()
})

</script>
