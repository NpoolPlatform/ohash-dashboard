<template>
  <q-table flat dense :rows='allGoods'>
    <template #top-right>
      <GoodTools @create-device='onCreateDeviceClick' />
    </template>
  </q-table>
  <q-dialog
    v-model='adding'
    position='right'
    class='add-menu'
    square
    auto-close
    no-shake
    @hide='onMenuHide'
  >
    <CreateGoodMenu />
  </q-dialog>
</template>

<script setup lang='ts'>
import { onMounted, computed, defineAsyncComponent, ref, watch } from 'vue'
import { useStore } from 'src/store'

import { ActionTypes as GoodActionTypes } from 'src/store/goods/action-types'
import { ModuleKey, Type as NotificationType } from 'src/store/notifications/const'
import { useI18n } from 'vue-i18n'

const CreateGoodMenu = defineAsyncComponent(() => import('src/components/good/CreateGoodMenu.vue'))
const GoodTools = defineAsyncComponent(() => import('src/components/good/GoodTools.vue'))

enum AddingType {
  AddingNone = 'none',
  AddingDevice = 'device',
  AddingGood = 'good'
}

const addingType = ref(AddingType.AddingNone)
const adding = ref(false)

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

watch(addingType, function (val) {
  adding.value = val !== AddingType.AddingNone
})

const onCreateDeviceClick = () => {
  addingType.value = AddingType.AddingDevice
}

const onMenuHide = () => {
  addingType.value = AddingType.AddingNone
}

</script>

<style lang='sass' scoped>
.good-tools
  width: 400px
  border-bottom: solid 1px $grey-4

.add-menu
  width: 400px
</style>
