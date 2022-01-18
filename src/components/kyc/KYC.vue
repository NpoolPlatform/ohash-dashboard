<template>
  <q-card class='container'>
    <q-list>
      <q-item>
        {{ $t('MSG_USERNAME') }}: {{ kycReview.User.Username }}
      </q-item>
      <q-item>
        {{ $t('MSG_FIRSTNAME') }}: {{ kycReview.User.FirstName }}
      </q-item>
      <q-item>
        {{ $t('MSG_LASTNAME') }}: {{ kycReview.User.LastName }}
      </q-item>
      <q-item>
        {{ $t('MSG_DISPLAYNAME') }}: {{ kycReview.User.DisplayName }}
      </q-item>
      <q-item>
        {{ $t('MSG_PHONENO') }}: {{ kycReview.User.PhoneNO }}
      </q-item>
      <q-item>
        {{ $t('MSG_EMAIL_ADDRESS') }}: {{ kycReview.User.EmailAddress }}
      </q-item>
      <q-item>
        {{ $t('MSG_REGISTER_AT') }}: {{ kycReview.User.CreateAt }}
      </q-item>
      <q-item>
        {{ $t('MSG_SUBMIT_AT') }}: {{ kycReview.Review.CreateAt }}
      </q-item>
      <q-item>
        <q-img class='kyc-image rounded-borders' :src='frontImg' :ratio='1'>
          <div class='absolute-bottom text-subtitle1 text-center'>
            {{ $t('MSG_FRONT') }}
          </div>
        </q-img>
        <q-img class='kyc-image rounded-borders' :src='backImg' :ratio='1'>
          <div class='absolute-bottom text-subtitle1 text-center'>
            {{ $t('MSG_BACK') }}
          </div>
        </q-img>
        <q-img class='kyc-image rounded-borders' :src='handingImg' :ratio='1'>
          <div class='absolute-bottom text-subtitle1 text-center'>
            {{ $t('MSG_HANDING') }}
          </div>
        </q-img>
      </q-item>
      <q-input
        v-model='comment'
        filled
        autogrow
        :label='$t("MSG_COMMENT")'
      />
      <q-item>
        <q-btn
          class='submit-btn'
          :label='$t("MSG_APPROVE")'
          @click='onApprove'
        />
        <q-btn
          class='submit-btn'
          :label='$t("MSG_REJECT")'
          @click='onReject'
        />
      </q-item>
    </q-list>
  </q-card>
</template>

<script setup lang='ts'>
import { withDefaults, defineProps, toRef, ref, defineEmits } from 'vue'

import { KYCReview } from 'src/store/reviews/types'

interface Props {
  kycReview?: KYCReview
  message: string
}

const props = withDefaults(defineProps<Props>(), {
  kycReview: undefined,
  message: ''
})
const kycReview = toRef(props, 'kycReview')

const frontImg = ref('icons/england.png')
const backImg = ref('icons/england.png')
const handingImg = ref('icons/england.png')

const comment = ref('')

const emit = defineEmits<{(e: 'approve'): void,
  (e: 'reject', message: string): void
}>()

const onApprove = () => {
  emit('approve')
}

const onReject = () => {
  emit('reject', comment.value)
}

</script>

<style lang='sass' scoped>
.kyc-image
  margin: 5px
  min-width: 300px

.container
  padding: 24px

.submit-btn
  margin: 24px 10px 24px 0
  background-color: $blue-6
  color: white

</style>
