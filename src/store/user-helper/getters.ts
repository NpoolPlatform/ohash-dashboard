import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { UserState } from './state'
import { AppRoleUser, UserInfo } from './types'

type UserGetters = {
  getLoginedUser (state: UserState): UserInfo
  getLogined (state: UserState): boolean
  getAppUserInfosByAppID (state: UserState): (appID: string) => Array<UserInfo>
  getAppRoleUsersByAppID (state: UserState): (appID: string) => Array<AppRoleUser>
  getUserSelectedAppID (state: UserState): string
  getGoogleToken (state: UserState): (req: string) => string
}

const getters: GetterTree<UserState, RootState> & UserGetters = {
  getLoginedUser: (state: UserState): UserInfo => state.LoginedUser,
  getLogined: (state: UserState): boolean => state.LoginedUser.User !== undefined,
  getAppUserInfosByAppID: (state: UserState): (appID: string) => Array<UserInfo> => {
    return (appID: string) => {
      return state.AppUserInfos.get(appID) as Array<UserInfo>
    }
  },
  getAppRoleUsersByAppID: (state: UserState): (appID: string) => Array<AppRoleUser> => {
    return (appID: string) => {
      return state.AppRoleUsers.get(appID) as Array<AppRoleUser>
    }
  },
  getUserSelectedAppID: (state: UserState): string => state.SelectedAppID,
  getGoogleToken: (state: UserState): (req: string) => string => {
    return (req: string) => {
      return state.GoogleToken.get(req) as string
    }
  }
}

export { UserGetters, getters }
