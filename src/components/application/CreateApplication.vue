<template>
  <q-card class='container'>
    <q-card-section>
      <q-item-label>{{ $t('MSG_ADD_LANGUAGE') }}</q-item-label>
    </q-card-section>
    <q-item-section>
      <q-input
        v-model='name'
        :label='$t("MSG_DISPLAY_NAME")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <q-input
        v-model='logo'
        :label='$t("MSG_LOGO")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <q-input
        v-model='description'
        :label='$t("MSG_DESCRIPTION")'
        type='textarea'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
    </q-item-section>
    <q-item-section>
      <q-item-label :label='$t("MSG_SIGNUP_METHODS")'>
        {{ signupMethods }}
      </q-item-label>
      <q-item-label :label='$t("MSG_EXTERN_SIGNIN_METHODS")'>
        {{ externSigninMethods }}
      </q-item-label>
      <q-item-label :label='$t("MSG_RECAPTCHA_METHOD")'>
        {{ recaptchaMethod }}
      </q-item-label>
      <q-toggle
        v-model='myKycEnable' :label='$t("MSG_KYC_ENABLE")' dense
      />
      <q-toggle
        v-model='mySigninVerifyEnable' :label='$t("MSG_SIGNIN_VERIFY_ENABLE")' dense
      />
      <q-toggle
        v-model='myInvitationCodeMust' :label='$t("MSG_INVITATION_CODE_MUST")' dense
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
import { computed, defineEmits, watch, ref, defineProps, toRef } from 'vue'
import { AppControl, Application } from 'src/store/applications/types'
import { useStore } from 'src/store'

interface Props {
  selectedApp?: Application
}

const props = defineProps<Props>()

const selectedApp = toRef(props, 'selectedApp')
const appControl = computed(() => {
  if (selectedApp.value && selectedApp.value.Ctrl) {
    return selectedApp.value.Ctrl
  }
  return {} as AppControl
})

const appName = computed(() => selectedApp.value && selectedApp.value.App ? selectedApp.value.App.Name : '')
const appLogo = computed(() => selectedApp.value && selectedApp.value.App ? selectedApp.value.App.Logo : '')
const appDescription = computed(() => selectedApp.value && selectedApp.value.App ? selectedApp.value.App.Description : '')

const signupMethods = computed(() => appControl.value.SignupMethods ? appControl.value.SignupMethods.join(',') : '')
const externSigninMethods = computed(() => appControl.value.ExternSigninMethods ? appControl.value.ExternSigninMethods.join(',') : '')
const recaptchaMethod = computed(() => appControl.value.RecaptchaMethod ? appControl.value.RecaptchaMethod : '')
const kycEnable = computed(() => appControl.value.KycEnable ? appControl.value.KycEnable : false)
const signinVerifyEnable = computed(() => appControl.value.SigninVerifyEnable ? appControl.value.SigninVerifyEnable : false)
const invitationCodeMust = computed(() => appControl.value.InvitationCodeMust ? appControl.value.InvitationCodeMust : false)

const myKycEnable = ref(kycEnable.value)
const mySigninVerifyEnable = ref(signinVerifyEnable.value)
const myInvitationCodeMust = ref(invitationCodeMust.value)

const store = useStore()

const name = ref(appName.value)
const logo = ref(appLogo.value)
const description = ref(appDescription.value)

const userID = computed(() => store.getters.getLoginedUser.User?.ID)

const application = computed(() => {
  return {
    App: {
      ID: selectedApp.value && selectedApp.value.App ? selectedApp.value.App.ID : undefined,
      CreatedBy: userID.value,
      Name: name.value,
      Logo: logo.value,
      Description: description.value
    },
    Ctrl: {
      ID: selectedApp.value && selectedApp.value.Ctrl ? selectedApp.value.Ctrl.ID : undefined,
      AppID: selectedApp.value && selectedApp.value.App ? selectedApp.value.App.ID : undefined,
      SignupMethods: signupMethods.value.split(','),
      ExternSigninMethods: externSigninMethods.value.split(','),
      RecaptchaMethod: recaptchaMethod.value,
      KycEnable: myKycEnable.value,
      SigninVerifyEnable: mySigninVerifyEnable.value,
      InvitationCodeMust: myInvitationCodeMust.value
    }
  } as Application
})

watch(application, () => {
  emit('update', application.value)
})

const emit = defineEmits<{(e: 'submit', info: Application): void,
  (e: 'update', info: Application): void
}>()

const onSubmit = () => {
  emit('submit', application.value)
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
