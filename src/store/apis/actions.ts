import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'
import { GetAPIsRequest, GetAPIsResponse } from './types'
import { APIsState } from './state'
import { ActionTree } from 'vuex'
import { AugmentedActionContext, RootState } from '../index'
import { APIMutations } from './mutations'
import { notificationPush, notificationPop } from '../notifications/helper'
import { MutationTypes as NotificationMutationTypes } from '../notifications/mutation-types'
import { Notification } from '../notifications/types'
import { api } from 'src/boot/axios'
import { API } from './const'
import { AxiosResponse } from 'axios'

interface APIActions {
  [ActionTypes.GetAPIs]({
    commit
  }: AugmentedActionContext<
    APIsState,
    RootState,
    APIMutations<APIsState>>,
    req: GetAPIsRequest): void
}

const actions: ActionTree<APIsState, RootState> = {
  [ActionTypes.GetAPIs] ({ commit }, req: GetAPIsRequest) {
    let waitingNotification: Notification
    if (req.Message.Waiting) {
      waitingNotification = notificationPush(req.Message.ModuleKey, req.Message.Waiting)
      commit(NotificationMutationTypes.Push, waitingNotification)
    }
    api
      .post<GetAPIsRequest, AxiosResponse<GetAPIsResponse>>(API.GET_APIS, req)
      .then((response: AxiosResponse<GetAPIsResponse>) => {
        commit(MutationTypes.SetAPIs, response.data.Infos)
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
  APIActions
}
