import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { UserState } from './state'
import { UserInfo } from './types'

type UserGetters = {
  getLoginedUser (state: UserState): UserInfo
  getLogined (state: UserState): boolean
  getGoogleToken (state: UserState): string
}

const getters: GetterTree<UserState, RootState> & UserGetters = {
  getLoginedUser: (state: UserState): UserInfo => state.LoginedUser,
  getLogined: (state: UserState): boolean => state.LoginedUser.User !== undefined,
  getGoogleToken: (state: UserState): string => state.GoogleToken
}

export { UserGetters, getters }
