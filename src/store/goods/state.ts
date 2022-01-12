import { DeviceInfo, Fee, FeeType, Good, VendorLocation } from './types'

interface GoodsState {
  AllGoods: Map<string, Good>
  AllDevices: Array<DeviceInfo>
  AllVendorLocations: Array<VendorLocation>
  AllFeeTypes: Array<FeeType>
  AllFees: Array<Fee>
}

function state (): GoodsState {
  return {
    AllGoods: new Map<string, Good>(),
    AllDevices: [],
    AllVendorLocations: [],
    AllFeeTypes: [],
    AllFees: []
  }
}

export {
  state,
  GoodsState
}
