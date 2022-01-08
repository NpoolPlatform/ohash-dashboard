<template>
  <div class='login-input'>
    <q-input
      v-model='username'
      :label='$t("MSG_USERNAME")'
    >
      <template #prepend>
        <q-icon name='account_circle' />
      </template>
    </q-input>
    <q-input
      v-model='password'
      :label='$t("MSG_PASSWORD")'
    >
      <template #prepend>
        <q-icon name='lock' />
      </template>
    </q-input>
    <div class='row'>
      <q-btn
        no-caps
        :label='$t("MSG_SIGNIN")'
        class='login-btn login-btn-left'
        @click='onLoginClick'
      />
      <q-btn
        no-caps
        :label='$t("MSG_CONTACT_ADMIN")'
        class='login-btn login-btn-right'
      />
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'

import { useStore } from '../../store'
import { ActionTypes as UserActionTypes } from '../../store/logined-user/action-types'
import { LoginType } from '../../store/logined-user/const'

const username = ref('')
const password = ref('')

const store = useStore()

const onLoginClick = () => {
  store.dispatch(UserActionTypes.Login, {
    Username: username.value,
    Password: password.value,
    LoginType: LoginType.USERNAME
  })
}

</script>

<style lang='sass' scoped>
.login-input
  width: 400px

.login-btn
  margin-top: 24px
  width: 195px
  background-color: $blue-6
  color: white
  border-radius: 12px

.login-btn-left
  margin-right: 5px

.login-btn-right
  margin-left: 5px
</style>
