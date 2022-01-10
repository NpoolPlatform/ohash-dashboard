import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { KYCsState } from './state'
import { KYCReview } from './types'

type KYCMutations<S = KYCsState> = {
  [MutationTypes.SetKYCReviews] (state: S, payload: Array<KYCReview>): void
  [MutationTypes.SetKYCSelectedAppID] (state: S, payload: string): void
}

const mutations: MutationTree<KYCsState> & KYCMutations = {
  [MutationTypes.SetKYCReviews] (state: KYCsState, payload: Array<KYCReview>) {
    state.KYCReviews = payload
  },
  [MutationTypes.SetKYCSelectedAppID] (state: KYCsState, payload: string): void {
    state.SelectedAppID = payload
  }
}

export { KYCMutations, mutations }
