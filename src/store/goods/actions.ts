import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'
import { GetAllGoodsRequest, GetAllGoodsResponse } from './types'
import { GoodsState } from './state'
import { ActionTree } from 'vuex'
import { AugmentedActionContext, RootState } from '../index'
import { GoodMutations } from './mutations'
import { notificationPush, notificationPop } from '../notifications/helper'
import { MutationTypes as NotificationMutationTypes } from '../notifications/mutation-types'
import { Notification } from '../notifications/types'
import { api } from 'src/boot/axios'
import { API } from './const'
import { AxiosResponse } from 'axios'

interface GoodActions {
  [ActionTypes.GetAllGoods]({
    commit
  }: AugmentedActionContext<
    GoodsState,
    RootState,
    GoodMutations<GoodsState>>,
    req: GetAllGoodsRequest): void
}

const actions: ActionTree<GoodsState, RootState> = {
  [ActionTypes.GetAllGoods] ({ commit }, req: GetAllGoodsRequest) {
    let waitingNotification: Notification
    if (req.Message.Waiting) {
      waitingNotification = notificationPush(req.Message.ModuleKey, req.Message.Waiting)
      commit(NotificationMutationTypes.Push, waitingNotification)
    }
    api
      .post<GetAllGoodsRequest, AxiosResponse<GetAllGoodsResponse>>(API.GET_ALL_GOODS, req)
      .then((response: AxiosResponse<GetAllGoodsResponse>) => {
        commit(MutationTypes.SetAllGoods, response.data.Infos)
        if (waitingNotification) {
          commit(NotificationMutationTypes.Pop, notificationPop(waitingNotification))
        }
      })
      .catch((err: Error) => {
        const error = req.Message.Error
        if (error) {
          error.Description = err.message
          const errorNotification = notificationPush(req.Message.ModuleKey, error)
          commit(NotificationMutationTypes.Push, errorNotification)
        }
      })
  }
}

export {
  actions,
  GoodActions
}
