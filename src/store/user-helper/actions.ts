import { ActionTree } from 'vuex'
import { AugmentedActionContext, RootState } from '../index'
import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'
import { UserMutations } from './mutations'
import { UserState } from './state'
import { api } from 'src/boot/axios'
import { LoginRequest, LoginResponse, GetGoogleTokenRequest } from './types'
import { API } from './const'
import { MutationTypes as NotificationMutationTypes } from '../notifications/mutation-types'
import { notificationPush, notificationPop } from '../notifications/helper'

interface UserActions {
  [ActionTypes.Login]({
    commit
  }: AugmentedActionContext<
    UserState,
    RootState,
    UserMutations<UserState>>,
    req: LoginRequest): void

  [ActionTypes.GetGoogleToken]({
    commit
  }: AugmentedActionContext<
    UserState,
    RootState,
    UserMutations<UserState>>,
    req: GetGoogleTokenRequest): void
}

const actions: ActionTree<UserState, RootState> = {
  [ActionTypes.Login] ({ commit }, req: LoginRequest) {
    const waitingNotification = notificationPush(req.Message.ModuleKey, req.Message.Waiting)
    commit(NotificationMutationTypes.Push, waitingNotification)
    api
      .post<LoginRequest, LoginResponse>(API.LOGIN, req)
      .then((response: LoginResponse) => {
        commit(MutationTypes.SetUserInfo, response.Info)
        commit(NotificationMutationTypes.Pop, notificationPop(waitingNotification))
      })
      .catch((err: Error) => {
        req.Message.Error.Description = err.message
        const errorNotification = notificationPush(req.Message.ModuleKey, req.Message.Error)
        commit(NotificationMutationTypes.Push, errorNotification)
      })
  },

  [ActionTypes.GetGoogleToken] ({ commit }, req: GetGoogleTokenRequest) {
    const recaptcha = req.Recaptcha
    if (recaptcha) {
      const { executeRecaptcha, recaptchaLoaded } = recaptcha
      const waitingNotification = notificationPush(req.Message.ModuleKey, req.Message.Waiting)
      commit(NotificationMutationTypes.Push, waitingNotification)
      recaptchaLoaded()
        .then((loaded: boolean) => {
          if (loaded) {
            void executeRecaptcha(req.Req)
              .then((token) => {
                commit(MutationTypes.SetGoogleToken, token)
                commit(NotificationMutationTypes.Pop, notificationPop(waitingNotification))
              })
              .catch((err: Error) => {
                req.Message.Error.Description = err.message
                const errorNotification = notificationPush(req.Message.ModuleKey, req.Message.Error)
                commit(NotificationMutationTypes.Push, errorNotification)
              })
          }
        })
        .catch((err: Error) => {
          req.Message.Error.Description = err.message
          const errorNotification = notificationPush(req.Message.ModuleKey, req.Message.Error)
          commit(NotificationMutationTypes.Push, errorNotification)
        })
    }
  }
}

export { actions, UserActions }
