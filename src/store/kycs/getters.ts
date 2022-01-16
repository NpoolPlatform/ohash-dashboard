import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { KYCsState } from './state'
import { KYC } from './types'

type KYCGetters = {
  getKYCs (state: KYCsState): Array<KYC>
}

const getters: GetterTree<KYCsState, RootState> & KYCGetters = {
  getKYCs: (state: KYCsState): Array<KYC> => state.KYCs
}

export { KYCGetters, getters }
