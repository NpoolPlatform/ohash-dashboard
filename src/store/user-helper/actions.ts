import { ActionTree } from 'vuex'
import { AugmentedActionContext, RootState } from '../index'
import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'
import { UserMutations } from './mutations'
import { UserState } from './state'
import { api } from 'src/boot/axios'
import {
  LoginRequest,
  LoginResponse,
  GetGoogleTokenRequest,
  GetAppUserInfosByOtherAppRequest,
  GetAppUserInfosByOtherAppResponse,
  GetAppRoleUsersByOtherAppRequest,
  GetAppRoleUsersByOtherAppResponse,
  CreateAppRoleUserForOtherAppRequest,
  CreateAppRoleUserForOtherAppResponse
} from './types'
import { API } from './const'
import { MutationTypes as NotificationMutationTypes } from '../notifications/mutation-types'
import { notificationPush, notificationPop } from '../notifications/helper'
import { Notification } from '../notifications/types'
import { doAction } from '../action'

interface UserActions {
  [ActionTypes.Login]({
    commit
  }: AugmentedActionContext<
    UserState,
    RootState,
    UserMutations<UserState>>,
    req: LoginRequest): void

  [ActionTypes.GetAppUserInfosByOtherApp]({
    commit
  }: AugmentedActionContext<
    UserState,
    RootState,
    UserMutations<UserState>>,
    req: GetAppUserInfosByOtherAppRequest): void

  [ActionTypes.GetAppRoleUsersByOtherApp]({
    commit
  }: AugmentedActionContext<
    UserState,
    RootState,
    UserMutations<UserState>>,
    req: GetAppRoleUsersByOtherAppRequest): void

  [ActionTypes.CreateAppRoleUserForOtherApp]({
    commit
  }: AugmentedActionContext<
    UserState,
    RootState,
    UserMutations<UserState>>,
    req: CreateAppRoleUserForOtherAppRequest): void

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
    doAction<LoginRequest, LoginResponse>(
      commit,
      API.LOGIN,
      req,
      req.Message,
      (resp: LoginResponse): void => {
        const headers = api.defaults.headers as Record<string, string>
        headers['X-User-ID'] = resp.Info.User?.ID as string
        headers['X-App-Login-Token'] = resp.Token
        commit(MutationTypes.SetLoginedUser, resp.Info)
      })
  },

  [ActionTypes.GetAppUserInfosByOtherApp] ({ commit }, req: GetAppUserInfosByOtherAppRequest) {
    doAction<GetAppUserInfosByOtherAppRequest, GetAppUserInfosByOtherAppResponse>(
      commit,
      API.GET_APP_USER_INFOS_BY_OTHER_APP,
      req,
      req.Message,
      (resp: GetAppUserInfosByOtherAppResponse): void => {
        commit(MutationTypes.SetAppUserInfos, resp.Infos)
      })
  },

  [ActionTypes.GetAppRoleUsersByOtherApp] ({ commit }, req: GetAppRoleUsersByOtherAppRequest) {
    doAction<GetAppRoleUsersByOtherAppRequest, GetAppRoleUsersByOtherAppResponse>(
      commit,
      API.GET_APP_ROLE_USERS_BY_OTHER_APP,
      req,
      req.Message,
      (resp: GetAppRoleUsersByOtherAppResponse): void => {
        commit(MutationTypes.SetAppRoleUsers, resp.Infos)
      })
  },

  [ActionTypes.CreateAppRoleUserForOtherApp] ({ commit }, req: CreateAppRoleUserForOtherAppRequest) {
    doAction<CreateAppRoleUserForOtherAppRequest, CreateAppRoleUserForOtherAppResponse>(
      commit,
      API.CREATE_APP_ROLE_USER_FOR_OTHER_APP,
      req,
      req.Message,
      (resp: CreateAppRoleUserForOtherAppResponse): void => {
        // commit(MutationTypes.SetAppRoleUsers, resp.Info)
        console.log('CREATED', resp.Info)
      })
  },

  [ActionTypes.GetGoogleToken] ({ commit }, req: GetGoogleTokenRequest) {
    const recaptcha = req.Recaptcha
    if (recaptcha) {
      const { executeRecaptcha, recaptchaLoaded } = recaptcha
      let waitingNotification: Notification
      if (req.Message.Waiting) {
        waitingNotification = notificationPush(req.Message.ModuleKey, req.Message.Waiting)
        commit(NotificationMutationTypes.Push, waitingNotification)
      }
      recaptchaLoaded()
        .then((loaded: boolean) => {
          if (loaded) {
            void executeRecaptcha(req.Req)
              .then((token) => {
                commit(MutationTypes.SetGoogleToken, {
                  Req: req.Req,
                  Token: token
                })
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
        })
        .catch((err: Error) => {
          const error = req.Message.Error
          if (error) {
            error.Description = err.message as string | undefined
            const errorNotification = notificationPush(req.Message.ModuleKey, error)
            commit(NotificationMutationTypes.Push, errorNotification)
          }
        })
    }
  }
}

export { actions, UserActions }
