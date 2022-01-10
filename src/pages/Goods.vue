<template>
  <q-table flat dense :rows='allGoods'>
    <template #top-right>
      <div class='good-tools row'>
        <q-space />
        <q-btn dense flat icon='note_add' />
      </div>
    </template>
  </q-table>
</template>

<script setup lang='ts'>
import { onMounted, computed } from 'vue'
import { useStore } from 'src/store'

import { ActionTypes as GoodActionTypes } from 'src/store/goods/action-types'
import { ModuleKey, Type as NotificationType } from 'src/store/notifications/const'
import { useI18n } from 'vue-i18n'

const store = useStore()
const allGoods = computed(() => store.getters.getAllGoods)

// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

onMounted(() => {
  store.dispatch(GoodActionTypes.GetAllGoods, {
    Message: {
      ModuleKey: ModuleKey.ModuleReviews,
      Error: {
        Title: t('MSG_GET_KYC_REVIEWS_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })
})

</script>

<style lang='sass' scoped>
.good-tools
  width: 400px
  border-bottom: solid 1px $grey-4
</style>
