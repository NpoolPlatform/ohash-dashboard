<template>
  <q-table
    flat
    dense
    :loading='loading'
    :rows='roleusers'
  >
    <template #top-right>
      <div class='row'>
        <q-space />
        <ApplicationSelector v-model:selected-app-id='selectedAppID' />
      </div>
    </template>
  </q-table>
</template>

<script setup lang='ts'>
import { onMounted, computed, ref, defineAsyncComponent, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from 'src/store'
import { ModuleKey, Type as NotificationType } from 'src/store/notifications/const'
import { FunctionVoid } from 'src/types/types'
import { MutationTypes as UserMutationTypes } from 'src/store/user-helper/mutation-types'
import { ActionTypes as UserActionTypes } from 'src/store/user-helper/action-types'
import { ActionTypes as ApplicationActionTypes } from 'src/store/applications/action-types'

const ApplicationSelector = defineAsyncComponent(() => import('src/components/dropdown/ApplicationSelector.vue'))

const store = useStore()
// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const selectedAppID = computed({
  get: () => store.getters.getUserSelectedAppID,
  set: (val) => {
    store.commit(UserMutationTypes.SetSelectedAppID, val)
  }
})
const roleusers = computed(() => store.getters.getAppRoleUsersByAppID(selectedAppID.value))
const loading = ref(false)

const unsubscribe = ref<FunctionVoid>()

watch(selectedAppID, () => {
  loading.value = true
  store.dispatch(UserActionTypes.GetAppRoleUsersByOtherApp, {
    TargetAppID: selectedAppID.value,
    Message: {
      ModuleKey: ModuleKey.ModuleUsers,
      Error: {
        Title: t('MSG_GET_APP_ROLES_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })
})

onMounted(() => {
  store.dispatch(ApplicationActionTypes.GetApplications, {
    Message: {
      ModuleKey: ModuleKey.ModuleUsers,
      Error: {
        Title: t('MSG_GET_APPLICATIONS_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })

  unsubscribe.value = store.subscribe((mutation) => {
    if (mutation.type === UserMutationTypes.SetAppRoleUsers) {
      loading.value = false
    }
  })
})

</script>
