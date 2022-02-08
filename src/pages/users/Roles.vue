<template>
  <q-table
    flat
    dense
    :loading='loading'
    :rows='roles'
    @row-click='(evt, row, index) => onRowClick(row as AppRole)'
  />
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
      @update='onUpdate'
      @submit='onSubmit'
    />
  </q-dialog>
</template>

<script setup lang='ts'>
import { onMounted, computed, ref, defineAsyncComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from 'src/store'
import { ModuleKey, Type as NotificationType } from 'src/store/notifications/const'
import { FunctionVoid } from 'src/types/types'
import { ActionTypes as ApplicationActionTypes } from 'src/store/application/action-types'
import { MutationTypes as ApplicationMutationTypes } from 'src/store/application/mutation-types'
import { AppRole } from 'src/store/user-helper/types'

const CreateAppRole = defineAsyncComponent(() => import('src/components/application/CreateAppRole.vue'))

const store = useStore()
// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const roles = computed(() => store.getters.getAppRoles)
const loading = ref(false)

const creating = ref(false)
const updating = ref(false)
const modifying = ref(false)

const selectedRole = ref()

const unsubscribe = ref<FunctionVoid>()

onMounted(() => {
  loading.value = true
  store.dispatch(ApplicationActionTypes.GetAppRoles, {
    Message: {
      ModuleKey: ModuleKey.ModuleUsers,
      Error: {
        Title: t('MSG_GET_APP_ROLES_FAIL'),
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

const onUpdate = (contact: AppRole) => {
  // TODO: fileter the list
  console.log('update', contact)
}

const onSubmit = (role: AppRole) => {
  creating.value = false
  updating.value = false
  modifying.value = false

  store.dispatch(ApplicationActionTypes.CreateAppRole, {
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

  store.dispatch(ApplicationActionTypes.GetAppRoles, {
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
