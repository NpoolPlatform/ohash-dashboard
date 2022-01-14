import { DeviceInfo, Fee, FeeType, ExpandGood, PriceCurrency, VendorLocation } from './types'

interface GoodsState {
  AllGoods: Array<ExpandGood>
  AllDevices: Array<DeviceInfo>
  AllVendorLocations: Array<VendorLocation>
  AllFeeTypes: Array<FeeType>
  AllFees: Array<Fee>
  AllPriceCurrencys: Array<PriceCurrency>
}

function state (): GoodsState {
  return {
    AllGoods: [] as Array<ExpandGood>,
    AllDevices: [],
    AllVendorLocations: [],
    AllFeeTypes: [],
    AllFees: [],
    AllPriceCurrencys: []
  }
}

export {
  state,
  GoodsState
}
