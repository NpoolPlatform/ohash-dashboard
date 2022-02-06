import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { UserState } from './state'
import { AppRoleUser, UserInfo } from './types'

type UserGetters = {
  getLoginedUser (state: UserState): UserInfo
  getLogined (state: UserState): boolean
  getAppUserInfosByAppID (state: UserState): (appID: string) => Array<UserInfo>
  getAppRoleUsersByAppID (state: UserState): (appID: string) => Array<AppRoleUser>
  getAppRoleUsersByAppRoleID (state: UserState): (appID: string, roleID: string) => Array<AppRoleUser>
  getUserByAppUserID (state: UserState): (appID: string, userID: string) => UserInfo | undefined
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
  getAppRoleUsersByAppRoleID: (state: UserState): (appID: string, roleID: string) => Array<AppRoleUser> => {
    return (appID: string, roleID: string) => {
      const roleUsers = [] as Array<AppRoleUser>
      const users = state.AppRoleUsers.get(appID)
      if (users) {
        users.forEach((user) => {
          if (roleID === user.RoleID) {
            roleUsers.push(user)
          }
        })
      }
      return roleUsers
    }
  },
  getUserByAppUserID: (state: UserState): (appID: string, userID: string) => UserInfo | undefined => {
    return (appID: string, userID: string) => {
      let user
      const users = state.AppUserInfos.get(appID)
      if (users) {
        users.forEach((myUser) => {
          if (userID === myUser.User?.ID) {
            user = myUser
          }
        })
      }
      return user
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
