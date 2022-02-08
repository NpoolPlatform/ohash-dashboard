import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { AuthsState } from './state'
import { Auth } from './types'

type AuthGetters = {
  getAuthsByApp (state: AuthsState): Array<Auth>
  getAuthsByUser (state: AuthsState): (userID: string) => Array<Auth>
  getAuthsByRole (state: AuthsState): (roleID: string) => Array<Auth>
}

const getters: GetterTree<AuthsState, RootState> & AuthGetters = {
  getAuthsByApp: (state: AuthsState): Array<Auth> => {
    const auths = [] as Array<Auth>
    state.AppAuths.forEach((auth) => {
      if (auth.RoleID === '' && auth.UserID === '') {
        auths.push(auth)
      }
    })
    return auths
  },
  getAuthsByUser: (state: AuthsState): (userID: string) => Array<Auth> => {
    const auths = [] as Array<Auth>
    return (userID: string) => {
      state.AppAuths.forEach((auth) => {
        if (auth.UserID === userID) {
          auths.push(auth)
        }
      })
      return auths
    }
  },
  getAuthsByRole: (state: AuthsState): (roleID: string) => Array<Auth> => {
    const auths = [] as Array<Auth>
    return (roleID: string) => {
      state.AppAuths.forEach((auth) => {
        if (auth.RoleID === roleID) {
          auths.push(auth)
        }
      })
      return auths
    }
  }
}

export { AuthGetters, getters }
