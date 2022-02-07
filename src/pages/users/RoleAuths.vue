<template>
  <div>
    <div>
      <div class='row'>
        <q-space />
        <ApplicationSelector v-model:selected-app-id='selectedAppID' />
      </div>
      <div class='row'>
        <q-table
          v-model:selected='selectedRole'
          dense
          :loading='loading'
          :rows='roleNames'
          :title='t("MSG_ROLE")'
          selection='single'
        />
        <q-table
          v-model:selected='selectedUser'
          dense
          :loading='loading'
          :rows='myAppUsers'
          :title='t("MSG_USER")'
          selection='single'
        />
      </div>
    </div>
    <div>
      <q-table
        flat
        dense
        :title='t("MSG_ROLE") + selectedRoleName + t("MSG_RESOURCE_SURFIX")'
        :rows='myRoleUsers'
      />
      <q-table
        flat
        dense
        :title='t("MSG_USER") + selectedUsername + t("MSG_RESOURCE_SURFIX")'
        :rows='myRoleUsers'
      />
      <q-table
        flat
        dense
        :title='t("MSG_APP_RESOURCE")'
        :rows='myRoleUsers'
      />
      <q-table
        v-model:selected='selectedUsers'
        row-key='ID'
        dense
        flat
        selection='multiple'
        :title='t("MSG_ALL_RESOURCE")'
        :rows='allResources'
      >
        <template #top-right>
          <div class='row'>
            <q-space />
            <q-btn dense @click='onAddUsersToRole'>
              {{ $t('MSG_ADD_TO_USER') }}
            </q-btn>
            <q-btn dense @click='onAddUsersToRole'>
              {{ $t('MSG_ADD_TO_ROLE') }}
            </q-btn>
            <q-btn dense @click='onAddUsersToRole'>
              {{ $t('MSG_ADD_TO_APP') }}
            </q-btn>
          </div>
        </template>
      </q-table>
    </div>
  </div>
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
import { AppUser } from 'src/store/user-helper/types'
import { ActionTypes as APIActionTypes } from 'src/store/apis/action-types'

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

interface roleName {
  ID: string
  Role: string
}

const selectedRole = ref([] as Array<roleName>)
const selectedRoleName = computed(() => {
  return selectedRole.value.length > 0 ? selectedRole.value[0].Role : ''
})
const selectedRoleID = computed(() => {
  return selectedRole.value.length > 0 ? selectedRole.value[0].ID : ''
})
const selectedUsers = ref([])

const roleusers = computed(() => store.getters.getAppRoleUsersByAppRoleID(selectedAppID.value, selectedRoleID.value))
const myRoleUsers = computed(() => {
  const users = [] as Array<AppUser>
  if (roleusers.value) {
    roleusers.value.forEach((roleuser) => {
      const user = store.getters.getUserByAppUserID(roleuser.AppID, roleuser.UserID)
      if (user) {
        users.push(user.User as AppUser)
      }
    })
  }
  return users
})

const appUsers = computed(() => store.getters.getAppUserInfosByAppID(selectedAppID.value))

interface userWithRoles {
  ID: string
  EmailAddress: string
  PhoneNO: string
  RoleNames: string
}
const myAppUsers = computed(() => {
  const users = [] as Array<userWithRoles>
  if (appUsers.value) {
    appUsers.value.forEach((user) => {
      const roleNames = [] as Array<string>
      user.Roles?.forEach((role) => {
        roleNames.push(role.Role)
      })
      users.push({
        ID: user.User?.ID as string,
        EmailAddress: user.User?.EmailAddress as string,
        PhoneNO: user.User?.PhoneNO as string,
        RoleNames: roleNames.join(',')
      })
    })
  }
  return users
})
const selectedUser = ref([] as Array<userWithRoles>)
const selectedUsername = computed(() => {
  if (selectedUser.value.length > 0) {
    if (selectedUser.value[0].EmailAddress.length > 0) {
      return selectedUser.value[0].EmailAddress
    }
    return selectedUser.value[0].PhoneNO
  }
  return ''
})

const loading = ref(false)
const roles = computed(() => store.getters.getAppRolesByAppID(selectedAppID.value))

const roleNames = computed(() => {
  const names = [] as Array<roleName>
  if (roles.value) {
    roles.value.forEach((role) => {
      names.push({
        ID: role.ID,
        Role: role.Role
      })
    })
  }
  return names
})

const allResources = computed(() => store.getters.getExpandAPIs)

const unsubscribe = ref<FunctionVoid>()

watch(selectedAppID, () => {
  loading.value = true
  store.dispatch(UserActionTypes.GetAppUserInfosByOtherApp, {
    TargetAppID: selectedAppID.value,
    Message: {
      ModuleKey: ModuleKey.ModuleUsers,
      Error: {
        Title: t('MSG_GET_APP_USER_INFOS_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })

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

const onAddUsersToRole = () => {
  console.log('add', selectedUsers.value)
}

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

  store.dispatch(APIActionTypes.GetAPIs, {
    Message: {
      ModuleKey: ModuleKey.ModuleReviews,
      Error: {
        Title: t('MSG_GET_APIS_FAIL'),
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
