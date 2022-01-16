import { KYC } from './types'

interface KYCsState {
  KYCs: Array<KYC>
}

function state (): KYCsState {
  return {
    KYCs: [] as Array<KYC>
  }
}

export {
  state,
  KYCsState
}
