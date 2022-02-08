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
  GetAppUserInfosRequest,
  GetAppUserInfosResponse,
  GetAppRoleUsersRequest,
  GetAppRoleUsersResponse,
  CreateAppRoleUserForAppOtherUserRequest,
  CreateAppRoleUserForAppOtherUserResponse,
  DeleteAppRoleUserRequest,
  DeleteAppRoleUserResponse
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

  [ActionTypes.GetAppUserInfos]({
    commit
  }: AugmentedActionContext<
    UserState,
    RootState,
    UserMutations<UserState>>,
    req: GetAppUserInfosRequest): void

  [ActionTypes.GetAppRoleUsers]({
    commit
  }: AugmentedActionContext<
    UserState,
    RootState,
    UserMutations<UserState>>,
    req: GetAppRoleUsersRequest): void

  [ActionTypes.CreateAppRoleUserForAppOtherUser]({
    commit
  }: AugmentedActionContext<
    UserState,
    RootState,
    UserMutations<UserState>>,
    req: CreateAppRoleUserForAppOtherUserRequest): void

    [ActionTypes.DeleteAppRoleUser]({
      commit
    }: AugmentedActionContext<
      UserState,
      RootState,
      UserMutations<UserState>>,
      req: DeleteAppRoleUserRequest): void

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

  [ActionTypes.GetAppUserInfos] ({ commit }, req: GetAppUserInfosRequest) {
    doAction<GetAppUserInfosRequest, GetAppUserInfosResponse>(
      commit,
      API.GET_APP_USER_INFOS,
      req,
      req.Message,
      (resp: GetAppUserInfosResponse): void => {
        commit(MutationTypes.SetAppUserInfos, resp.Infos)
      })
  },

  [ActionTypes.GetAppRoleUsers] ({ commit }, req: GetAppRoleUsersRequest) {
    doAction<GetAppRoleUsersRequest, GetAppRoleUsersResponse>(
      commit,
      API.GET_APP_ROLE_USERS,
      req,
      req.Message,
      (resp: GetAppRoleUsersResponse): void => {
        commit(MutationTypes.SetAppRoleUsers, resp.Infos)
      })
  },

  [ActionTypes.CreateAppRoleUserForAppOtherUser] ({ commit }, req: CreateAppRoleUserForAppOtherUserRequest) {
    doAction<CreateAppRoleUserForAppOtherUserRequest, CreateAppRoleUserForAppOtherUserResponse>(
      commit,
      API.CREATE_APP_ROLE_USER_FOR_APP_OTHER_USER,
      req,
      req.Message,
      (resp: CreateAppRoleUserForAppOtherUserResponse): void => {
        commit(MutationTypes.SetAppRoleUsers, [resp.Info])
      })
  },

  [ActionTypes.DeleteAppRoleUser] ({ commit }, req: DeleteAppRoleUserRequest) {
    doAction<DeleteAppRoleUserRequest, DeleteAppRoleUserResponse>(
      commit,
      API.DELETE_APP_ROLE_USER,
      req,
      req.Message,
      (resp: DeleteAppRoleUserResponse): void => {
        commit(MutationTypes.DeleteAppRoleUser, resp.Info)
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
