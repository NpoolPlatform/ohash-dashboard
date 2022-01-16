import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { KYCsState } from './state'
import { KYC } from './types'

type KYCMutations<S = KYCsState> = {
  [MutationTypes.SetKYCs] (state: S, payload: Array<KYC>): void
}

const mutations: MutationTree<KYCsState> & KYCMutations = {
  [MutationTypes.SetKYCs] (state: KYCsState, payload: Array<KYC>) {
    state.KYCs = payload
  }
}

export { KYCMutations, mutations }
