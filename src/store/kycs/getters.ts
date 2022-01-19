import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { ImageType } from './const'
import { KYCsState } from './state'
import { KYC, KYCImage } from './types'

type KYCGetters = {
  getKYCs (state: KYCsState): Array<KYC>
  getKYCImage (state: KYCsState): (kycID: string, imageType: ImageType) => KYCImage
}

const getters: GetterTree<KYCsState, RootState> & KYCGetters = {
  getKYCs: (state: KYCsState): Array<KYC> => state.KYCs,
  getKYCImage: (state: KYCsState): (kycID: string, imageType: ImageType) => KYCImage => {
    return (kycID: string, imageType: ImageType) => {
      return state.Images.get(kycID)?.get(imageType) as KYCImage
    }
  }
}

export { KYCGetters, getters }
