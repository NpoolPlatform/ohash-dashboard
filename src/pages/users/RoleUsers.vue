<template>
  <div class='row'>
    <q-table
      v-model:selected='selectedRole'
      row-key='ID'
      flat
      dense
      :loading='loading'
      :rows='roleNames'
      selection='single'
    />
    <div>
      <q-table
        v-model:selected='selectedRoleUsers'
        row-key='RoleUserID'
        selection='multiple'
        flat
        dense
        :title='selectedRoleName + t("MSG_USER_SURFIX")'
        :rows='myRoleUsers'
      >
        <template #top-right>
          <div class='row'>
            <q-space />
            <q-btn dense @click='onDeleteUsersFromRole'>
              {{ $t('MSG_DELETE') }}
            </q-btn>
          </div>
        </template>
      </q-table>
      <q-table
        v-model:selected='selectedUsers'
        row-key='ID'
        dense
        flat
        selection='multiple'
        :title='t("MSG_APP_USER")'
        :rows='myAppUsers'
      >
        <template #top-right>
          <div class='row'>
            <q-space />
            <q-btn dense @click='onAddUsersToRole'>
              {{ $t('MSG_ADD') }}
            </q-btn>
          </div>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { onMounted, computed, ref, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from 'src/store'
import { ModuleKey, Type as NotificationType } from 'src/store/notifications/const'
import { FunctionVoid } from 'src/types/types'
import { MutationTypes as UserMutationTypes } from 'src/store/user-helper/mutation-types'
import { ActionTypes as UserActionTypes } from 'src/store/user-helper/action-types'
import { ActionTypes as ApplicationActionTypes } from 'src/store/application/action-types'
import { AppUser } from 'src/store/user-helper/types'

const store = useStore()
// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

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

const roleusers = computed(() => store.getters.getAppRoleUsersByRoleID(selectedRoleID.value))

interface appUserWithRole extends AppUser {
  RoleUserID: string
}

const myRoleUsers = computed(() => {
  const users = [] as Array<appUserWithRole>
  if (roleusers.value) {
    roleusers.value.forEach((roleuser) => {
      const user = store.getters.getUserByUserID(roleuser.UserID as string)
      if (user) {
        users.push({
          RoleUserID: roleuser.ID as string,
          EmailAddress: user.User?.EmailAddress,
          PhoneNO: user.User?.PhoneNO
        })
      }
    })
  }
  return users
})

const selectedRoleUsers = ref([])

const appUsers = computed(() => store.getters.getAppUserInfos)

interface userWithRoles extends AppUser {
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
        ID: user.User?.ID,
        EmailAddress: user.User?.EmailAddress,
        PhoneNO: user.User?.PhoneNO,
        RoleNames: roleNames.join(',')
      })
    })
  }
  return users
})

const loading = ref(false)
const roles = computed(() => store.getters.getAppRoles)

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

const unsubscribe = ref<FunctionVoid>()

const onAddUsersToRole = () => {
  selectedUsers.value.forEach((user: AppUser) => {
    store.dispatch(UserActionTypes.CreateAppRoleUserForAppOtherUser, {
      TargetUserID: user.ID as string,
      Info: {
        RoleID: selectedRoleID.value
      },
      Message: {
        ModuleKey: ModuleKey.ModuleUsers,
        Error: {
          Title: t('MSG_CREATE_APP_ROLE_USER_FAIL'),
          Popup: true,
          Type: NotificationType.Error
        }
      }
    })
  })
}

const onDeleteUsersFromRole = () => {
  selectedRoleUsers.value.forEach((user: appUserWithRole) => {
    store.dispatch(UserActionTypes.DeleteAppRoleUser, {
      ID: user.RoleUserID,
      Message: {
        ModuleKey: ModuleKey.ModuleUsers,
        Error: {
          Title: t('MSG_DELETE_APP_ROLE_USER_FAIL'),
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

  store.dispatch(UserActionTypes.GetAppRoleUsers, {
    Message: {
      ModuleKey: ModuleKey.ModuleUsers,
      Error: {
        Title: t('MSG_GET_APP_ROLES_FAIL'),
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

  unsubscribe.value = store.subscribe((mutation) => {
    if (mutation.type === UserMutationTypes.SetAppRoleUsers) {
      loading.value = false
    }
  })
})

onUnmounted(() => {
  unsubscribe.value?.()
})

</script>
