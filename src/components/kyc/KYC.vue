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
import { withDefaults, defineProps, toRef, ref, defineEmits, onMounted, computed } from 'vue'
import { useStore } from 'src/store'
import { useI18n } from 'vue-i18n'

import { KYCReview } from 'src/store/reviews/types'
import { ActionTypes as KYCActionTypes } from 'src/store/kycs/action-types'
import { ImageType } from 'src/store/kycs/const'
import { ModuleKey, Type as NotificationType } from 'src/store/notifications/const'

interface Props {
  kycReview: KYCReview
  message: string
}

const props = withDefaults(defineProps<Props>(), {
  message: ''
})
const kycReview = toRef(props, 'kycReview')

const store = useStore()
// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const frontImg = computed(() => {
  const image = store.getters.getKYCImage(kycReview.value.Kyc.ID, ImageType.Front)
  return image ? image.Base64 : ref('icons/england.png')
})
const backImg = computed(() => {
  const image = store.getters.getKYCImage(kycReview.value.Kyc.ID, ImageType.Back)
  return image ? image.Base64 : ref('icons/england.png')
})
const handingImg = computed(() => {
  const image = store.getters.getKYCImage(kycReview.value.Kyc.ID, ImageType.Handing)
  return image ? image.Base64 : ref('icons/england.png')
})

const comment = ref('')

const emit = defineEmits<{(e: 'approve'): void,
  (e: 'reject', message: string): void
}>()

const onApprove = () => {
  emit('approve')
}

const onReject = () => {
  if (comment.value === '') {
    return
  }
  emit('reject', comment.value)
}

onMounted(() => {
  store.dispatch(KYCActionTypes.GetKYCImage, {
    KYCID: kycReview.value.Kyc.ID,
    ImageType: ImageType.Front,
    ImageS3Key: kycReview.value.Kyc.FrontCardImg,
    Message: {
      ModuleKey: ModuleKey.ModuleReviews,
      Error: {
        Title: t('MSG_UPDATE_KYC_IMAGE_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })
  store.dispatch(KYCActionTypes.GetKYCImage, {
    KYCID: kycReview.value.Kyc.ID,
    ImageType: ImageType.Back,
    ImageS3Key: kycReview.value.Kyc.BackCardImg,
    Message: {
      ModuleKey: ModuleKey.ModuleReviews,
      Error: {
        Title: t('MSG_UPDATE_KYC_IMAGE_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })
  store.dispatch(KYCActionTypes.GetKYCImage, {
    KYCID: kycReview.value.Kyc.ID,
    ImageType: ImageType.Handing,
    ImageS3Key: kycReview.value.Kyc.UserHandingCardImg,
    Message: {
      ModuleKey: ModuleKey.ModuleReviews,
      Error: {
        Title: t('MSG_UPDATE_KYC_IMAGE_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })
})

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
