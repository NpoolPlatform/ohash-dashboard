import { DeviceInfo, Fee, FeeType, GoodDetail, PriceCurrency, VendorLocation } from './types'

interface GoodsState {
  AllGoods: Array<GoodDetail>
  AllDevices: Array<DeviceInfo>
  AllVendorLocations: Array<VendorLocation>
  AllFeeTypes: Array<FeeType>
  AllFees: Array<Fee>
  AllPriceCurrencys: Array<PriceCurrency>
}

function state (): GoodsState {
  return {
    AllGoods: [] as Array<GoodDetail>,
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
