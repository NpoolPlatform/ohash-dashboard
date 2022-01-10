import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { KYCsState } from './state'
import { GoodReview, KYCReview } from './types'

type KYCMutations<S = KYCsState> = {
  [MutationTypes.SetKYCReviews] (state: S, payload: Array<KYCReview>): void
  [MutationTypes.SetKYCSelectedAppID] (state: S, payload: string): void
  [MutationTypes.SetGoodReviews] (state: S, payload: Array<GoodReview>): void
}

const mutations: MutationTree<KYCsState> & KYCMutations = {
  [MutationTypes.SetKYCReviews] (state: KYCsState, payload: Array<KYCReview>) {
    state.KYCReviews = payload
  },
  [MutationTypes.SetKYCSelectedAppID] (state: KYCsState, payload: string): void {
    state.SelectedAppID = payload
  },
  [MutationTypes.SetGoodReviews] (state: KYCsState, payload: Array<GoodReview>): void {
    state.GoodReviews = payload
  }
}

export { KYCMutations, mutations }
