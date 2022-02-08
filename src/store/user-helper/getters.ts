import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { UserState } from './state'
import { AppRoleUser, UserInfo } from './types'

type UserGetters = {
  getLoginedUser (state: UserState): UserInfo
  getLogined (state: UserState): boolean
  getAppUserInfos (state: UserState): Array<UserInfo>
  getAppRoleUsers (state: UserState): Array<AppRoleUser>
  getAppRoleUsersByRoleID (state: UserState): (roleID: string) => Array<AppRoleUser>
  getUserByUserID (state: UserState): (userID: string) => UserInfo | undefined
  getGoogleToken (state: UserState): (req: string) => string
}

const getters: GetterTree<UserState, RootState> & UserGetters = {
  getLoginedUser: (state: UserState): UserInfo => state.LoginedUser,
  getLogined: (state: UserState): boolean => state.LoginedUser.User !== undefined,
  getAppUserInfos: (state: UserState): Array<UserInfo> => state.AppUserInfos,
  getAppRoleUsers: (state: UserState): Array<AppRoleUser> => state.AppRoleUsers,
  getAppRoleUsersByRoleID: (state: UserState): (roleID: string) => Array<AppRoleUser> => {
    return (roleID: string) => {
      const roleUsers = [] as Array<AppRoleUser>
      state.AppRoleUsers.forEach((user) => {
        if (roleID === user.RoleID) {
          roleUsers.push(user)
        }
      })
      return roleUsers
    }
  },
  getUserByUserID: (state: UserState): (userID: string) => UserInfo | undefined => {
    return (userID: string) => {
      let user = {} as UserInfo
      state.AppUserInfos.forEach((myUser) => {
        if (userID === myUser.User?.ID) {
          user = myUser
        }
      })
      return user
    }
  },
  getGoogleToken: (state: UserState): (req: string) => string => {
    return (req: string) => {
      return state.GoogleToken.get(req) as string
    }
  }
}

export { UserGetters, getters }
