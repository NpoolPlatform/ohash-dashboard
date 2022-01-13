import { DeviceInfo, Fee, FeeType, GoodDetail, VendorLocation } from './types'

interface GoodsState {
  AllGoods: Array<GoodDetail>
  AllDevices: Array<DeviceInfo>
  AllVendorLocations: Array<VendorLocation>
  AllFeeTypes: Array<FeeType>
  AllFees: Array<Fee>
}

function state (): GoodsState {
  return {
    AllGoods: [] as Array<GoodDetail>,
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
