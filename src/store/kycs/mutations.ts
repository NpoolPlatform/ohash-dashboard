import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { KYCsState } from './state'
import { KYC, KYCImage } from './types'

type KYCMutations<S = KYCsState> = {
  [MutationTypes.SetKYCs] (state: S, payload: Array<KYC>): void
  [MutationTypes.SetKYCImage] (state: S, payload: KYCImage): void
}

const mutations: MutationTree<KYCsState> & KYCMutations = {
  [MutationTypes.SetKYCs] (state: KYCsState, payload: Array<KYC>) {
    state.KYCs = payload
  },
  [MutationTypes.SetKYCImage] (state: KYCsState, payload: KYCImage) {
    let imgMap = state.Images.get(payload.KYCID as string)
    if (!imgMap) {
      imgMap = new Map<string, KYCImage>()
    }
    imgMap.set(payload.ImageType as string, payload)
    state.Images.set(payload.KYCID as string, imgMap)
  }
}

export { KYCMutations, mutations }
