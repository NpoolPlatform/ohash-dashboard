import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { KYCsState } from './state'
import { KYCReview } from './types'

type KYCGetters = {
  getKYCReviews (state: KYCsState): Array<KYCReview>
  getKYCSelectedAppID (state: KYCsState): string
}

const getters: GetterTree<KYCsState, RootState> & KYCGetters = {
  getKYCReviews: (state: KYCsState): Array<KYCReview> => state.KYCReviews,
  getKYCSelectedAppID: (state: KYCsState): string => state.SelectedAppID
}

export { KYCGetters, getters }
