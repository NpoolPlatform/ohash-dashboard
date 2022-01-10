import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { KYCsState } from './state'
import { GoodReview, KYCReview } from './types'

type KYCGetters = {
  getKYCReviews (state: KYCsState): Array<KYCReview>
  getKYCSelectedAppID (state: KYCsState): string
  getGoodReviews (state: KYCsState): Array<GoodReview>
}

const getters: GetterTree<KYCsState, RootState> & KYCGetters = {
  getKYCReviews: (state: KYCsState): Array<KYCReview> => state.KYCReviews,
  getKYCSelectedAppID: (state: KYCsState): string => state.SelectedAppID,
  getGoodReviews: (state: KYCsState): Array<GoodReview> => state.GoodReviews
}

export { KYCGetters, getters }
