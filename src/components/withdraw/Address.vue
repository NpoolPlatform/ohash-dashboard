<template>
  <q-card class='container'>
    <q-list>
      <q-item>
        {{ $t('MSG_USERNAME') }}: {{ withdrawAddressReview.User.Extra?.Username }}
      </q-item>
      <q-item>
        {{ $t('MSG_FIRSTNAME') }}: {{ withdrawAddressReview.User.Extra?.FirstName }}
      </q-item>
      <q-item>
        {{ $t('MSG_LASTNAME') }}: {{ withdrawAddressReview.User.Extra?.LastName }}
      </q-item>
      <q-item>
        {{ $t('MSG_PHONENO') }}: {{ withdrawAddressReview.User.User?.PhoneNO }}
      </q-item>
      <q-item>
        {{ $t('MSG_EMAIL_ADDRESS') }}: {{ withdrawAddressReview.User.User?.EmailAddress }}
      </q-item>
      <q-item>
        {{ $t('MSG_REGISTER_AT') }}: {{ withdrawAddressReview.User.User?.CreateAt }}
      </q-item>
      <q-item>
        {{ $t('MSG_SUBMIT_AT') }}: {{ withdrawAddressReview.Review.CreateAt }}
      </q-item>
      <q-item>
        {{ $t('MSG_ADDRESS') }}: {{ withdrawAddressReview.Account.Address }}
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
import { WithdrawAddressReview } from 'src/store/reviews/types'
import { useStore } from 'src/store'

interface Props {
  withdrawAddressReview: WithdrawAddressReview
}

const store = useStore()

const props = defineProps<Props>()
const withdrawAddressReview = toRef(props, 'withdrawAddressReview')

const comment = ref(withdrawAddressReview.value.Review.Message)
const cointype = computed(() => store.getters.getCoinByID(withdrawAddressReview.value.Account.CoinTypeID).Name)

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
