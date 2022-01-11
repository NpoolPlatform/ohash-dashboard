import { DeviceInfo, Good, VendorLocation } from './types'

interface GoodsState {
  AllGoods: Map<string, Good>
  AllDevices: Array<DeviceInfo>
  AllVendorLocations: Array<VendorLocation>
}

function state (): GoodsState {
  return {
    AllGoods: new Map<string, Good>(),
    AllDevices: [],
    AllVendorLocations: []
  }
}

export {
  state,
  GoodsState
}
