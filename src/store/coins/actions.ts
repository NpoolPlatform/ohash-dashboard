import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'
import { GetCoinsRequest, GetCoinsResponse } from './types'
import { CoinsState } from './state'
import { ActionTree } from 'vuex'
import { AugmentedActionContext, RootState } from '../index'
import { CoinMutations } from './mutations'
import { notificationPush, notificationPop } from '../notifications/helper'
import { MutationTypes as NotificationMutationTypes } from '../notifications/mutation-types'
import { Notification } from '../notifications/types'
import { api } from 'src/boot/axios'
import { API } from './const'
import { AxiosResponse } from 'axios'

interface CoinActions {
  [ActionTypes.GetCoins]({
    commit
  }: AugmentedActionContext<
    CoinsState,
    RootState,
    CoinMutations<CoinsState>>,
    req: GetCoinsRequest): void
}

const actions: ActionTree<CoinsState, RootState> = {
  [ActionTypes.GetCoins] ({ commit }, req: GetCoinsRequest) {
    let waitingNotification: Notification
    if (req.Message.Waiting) {
      waitingNotification = notificationPush(req.Message.ModuleKey, req.Message.Waiting)
      commit(NotificationMutationTypes.Push, waitingNotification)
    }
    api
      .post<GetCoinsRequest, AxiosResponse<GetCoinsResponse>>(API.GET_COINS, req)
      .then((response: AxiosResponse<GetCoinsResponse>) => {
        commit(MutationTypes.SetCoins, response.data.Infos)
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
  CoinActions
}
