<template>
  <q-table
    flat
    dense
    :loading='loading'
    :rows='roles'
    @row-click='(evt, row, index) => onRowClick(row as AppRole)'
  >
    <template #top-right>
      <div class='row'>
        <q-space />
        <q-btn dense @click='onCreateAppRoleClick'>
          {{ $t('MSG_CREATE_ROLE') }}
        </q-btn>
        <ApplicationSelector v-model:selected-app-id='selectedAppID' />
      </div>
    </template>
  </q-table>
  <q-dialog
    v-model='modifying'
    position='right'
    full-width
    square
    no-shake
    @hide='onMenuHide'
  >
    <CreateAppRole
      v-model:edit-role='selectedRole'
      v-model:selected-app='selectedApp'
      @update='onUpdate'
      @submit='onSubmit'
    />
  </q-dialog>
</template>

<script setup lang='ts'>
import { onMounted, computed, ref, defineAsyncComponent, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from 'src/store'
import { ModuleKey, Type as NotificationType } from 'src/store/notifications/const'
import { FunctionVoid } from 'src/types/types'
import { MutationTypes as UserMutationTypes } from 'src/store/user-helper/mutation-types'
import { ActionTypes as ApplicationActionTypes } from 'src/store/applications/action-types'
import { MutationTypes as ApplicationMutationTypes } from 'src/store/applications/mutation-types'
import { AppRole } from 'src/store/user-helper/types'

const ApplicationSelector = defineAsyncComponent(() => import('src/components/dropdown/ApplicationSelector.vue'))
const CreateAppRole = defineAsyncComponent(() => import('src/components/application/CreateAppRole.vue'))

const store = useStore()
// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const selectedAppID = computed({
  get: () => store.getters.getUserSelectedAppID,
  set: (val) => {
    store.commit(UserMutationTypes.SetSelectedAppID, val)
  }
})
const selectedApp = computed(() => store.getters.getApplicationByID(selectedAppID.value))
const roles = computed(() => store.getters.getAppRolesByAppID(selectedAppID.value))
const loading = ref(false)

const creating = ref(false)
const updating = ref(false)
const modifying = ref(false)

const selectedRole = ref()

const unsubscribe = ref<FunctionVoid>()

watch(selectedAppID, () => {
  loading.value = true
  store.dispatch(ApplicationActionTypes.GetAppRolesByOtherApp, {
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
    if (mutation.type === ApplicationMutationTypes.SetAppRoles) {
      loading.value = false
    }
  })
})

const onCreateAppRoleClick = () => {
  creating.value = true
  modifying.value = true
}

const onUpdate = (contact: AppRole) => {
  // TODO: fileter the list
  console.log('update', contact)
}

const onSubmit = (role: AppRole) => {
  creating.value = false
  updating.value = false
  modifying.value = false

  store.dispatch(ApplicationActionTypes.CreateAppRoleForOtherApp, {
    TargetAppID: selectedAppID.value,
    Info: role,
    Message: {
      ModuleKey: ModuleKey.ModuleUsers,
      Error: {
        Title: t('MSG_CREATE_ROLE_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })

  store.dispatch(ApplicationActionTypes.GetAppRolesByOtherApp, {
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
}

const onMenuHide = () => {
  creating.value = false
  updating.value = false
  modifying.value = false
}

const onRowClick = (role: AppRole) => {
  selectedRole.value = role
  updating.value = true
  modifying.value = true
}

</script>
