import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { UserState } from './state'
import { UserInfo } from './types'

type UserGetters = {
  getUserInfos (state: UserState): Array<UserInfo>
  getUserLogined (state: UserState): boolean
  getUserLoading (state: UserState): boolean
  getUserError (state: UserState): string
}

const getters: GetterTree<UserState, RootState> & UserGetters = {
  getUserInfos: (state: UserState): Array<UserInfo> => state.Infos,
  getUserLogined: (state: UserState): boolean => state.Logined,
  getUserLoading: (state: UserState): boolean => state.loading,
  getUserError: (state: UserState): string => state.error
}

export { UserGetters, getters }
