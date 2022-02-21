<template>
  <q-card class='container'>
    <q-list>
      <q-item>
        {{ $t('MSG_USERNAME') }}: {{ withdrawReview.User.Extra?.Username }}
      </q-item>
      <q-item>
        {{ $t('MSG_FIRSTNAME') }}: {{ withdrawReview.User.Extra?.FirstName }}
      </q-item>
      <q-item>
        {{ $t('MSG_LASTNAME') }}: {{ withdrawReview.User.Extra?.LastName }}
      </q-item>
      <q-item>
        {{ $t('MSG_PHONENO') }}: {{ withdrawReview.User.User?.PhoneNO }}
      </q-item>
      <q-item>
        {{ $t('MSG_EMAIL_ADDRESS') }}: {{ withdrawReview.User.User?.EmailAddress }}
      </q-item>
      <q-item>
        {{ $t('MSG_REGISTER_AT') }}: {{ withdrawReview.User.User?.CreateAt }}
      </q-item>
      <q-item>
        {{ $t('MSG_SUBMIT_AT') }}: {{ withdrawReview.Review.CreateAt }}
      </q-item>
      <q-item>
        {{ $t('MSG_AMOUNT') }}: {{ withdrawReview.Withdraw.Amount }}
      </q-item>
      <q-item>
        {{ $t('MSG_COIN_TYPE') }}: {{ cointype }}
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
import { defineProps, toRef, ref, defineEmits, computed } from 'vue'
import { WithdrawReview } from 'src/store/reviews/types'
import { useStore } from 'src/store'

interface Props {
  withdrawReview: WithdrawReview
}

const store = useStore()

const props = defineProps<Props>()
const withdrawReview = toRef(props, 'withdrawReview')

const comment = ref(withdrawReview.value.Review.Message)
const cointype = computed(() => store.getters.getCoinByID(withdrawReview.value.Withdraw.CoinTypeID).Name)

const emit = defineEmits<{(e: 'approve'): void,
  (e: 'reject', message: string): void
}>()

const onApprove = () => {
  emit('approve')
}

const onReject = () => {
  if (!comment.value || comment.value === '') {
    return
  }
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
