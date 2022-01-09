import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { UserState } from './state'
import { UserInfo } from './types'

type UserGetters = {
  getUserInfo (state: UserState): UserInfo
  getLogined (state: UserState): boolean
  getGoogleToken (state: UserState): string
}

const getters: GetterTree<UserState, RootState> & UserGetters = {
  getUserInfo: (state: UserState): UserInfo => state.Info,
  getLogined: (state: UserState): boolean => {
    return state.Info.UserID !== '' && state.Info.UserID !== undefined
  },
  getGoogleToken: (state: UserState): string => state.GoogleToken
}

export { UserGetters, getters }
