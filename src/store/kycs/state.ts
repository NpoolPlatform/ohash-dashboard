import { KYC, KYCImage } from './types'

interface KYCsState {
  KYCs: Array<KYC>
  Images: Map<string, Map<string, KYCImage>>
}

function state (): KYCsState {
  return {
    KYCs: [] as Array<KYC>,
    Images: new Map<string, Map<string, KYCImage>>()
  }
}

export {
  state,
  KYCsState
}
