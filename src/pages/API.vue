<template>
  <q-table
    flat
    dense
    :loading='loading'
    :rows='apis'
  />
</template>

<script setup lang='ts'>
import { onMounted, computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from 'src/store'
import { ActionTypes as APIActionTypes } from 'src/store/apis/action-types'
import { ModuleKey, Type as NotificationType } from 'src/store/notifications/const'
import { FunctionVoid } from 'src/types/types'
import { MutationTypes as APIMutationTypes } from 'src/store/apis/mutation-types'

const store = useStore()
// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const apis = computed(() => store.getters.getExpandAPIs)
const loading = ref(true)

const unsubscribe = ref<FunctionVoid>()

onMounted(() => {
  unsubscribe.value = store.subscribe((mutation) => {
    if (mutation.type === APIMutationTypes.SetAPIs) {
      loading.value = false
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
})

</script>
