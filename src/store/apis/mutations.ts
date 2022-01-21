import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { APIsState } from './state'
import { API } from './types'

type APIMutations<S = APIsState> = {
  [MutationTypes.SetAPIs] (state: S, payload: Array<API>): void
}

const mutations: MutationTree<APIsState> & APIMutations = {
  [MutationTypes.SetAPIs] (state: APIsState, payload: Array<API>) {
    state.APIs = payload
  }
}

export { APIMutations, mutations }
