import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { GoodsState } from './state'
import { DeviceInfo, Fee, FeeType, GoodDetail, PriceCurrency, VendorLocation } from './types'

type GoodGetters = {
  getGoodByID (state: GoodsState): (id: string) => GoodDetail
  getAllGoods (state: GoodsState): Array<GoodDetail>
  getAllDevices (state: GoodsState): Array<DeviceInfo>
  getAllVendorLocations (state: GoodsState): Array<VendorLocation>
  getAllFeeTypes (state: GoodsState): Array<FeeType>
  getAllFees (state: GoodsState): Array<Fee>
  getAllPriceCurrencys (state: GoodsState): Array<PriceCurrency>
}

const getters: GetterTree<GoodsState, RootState> & GoodGetters = {
  getGoodByID: (state: GoodsState): (id: string) => GoodDetail => {
    return (id: string) => {
      const goods = state.AllGoods.filter((good) => {
        return good.ID === id
      })
      if (goods) {
        return goods[0]
      }
      return undefined as unknown as GoodDetail
    }
  },
  getAllGoods: (state: GoodsState): Array<GoodDetail> => state.AllGoods,
  getAllDevices: (state: GoodsState): Array<DeviceInfo> => state.AllDevices,
  getAllVendorLocations: (state: GoodsState): Array<VendorLocation> => state.AllVendorLocations,
  getAllFeeTypes: (state: GoodsState): Array<FeeType> => state.AllFeeTypes,
  getAllFees: (state: GoodsState): Array<Fee> => state.AllFees,
  getAllPriceCurrencys: (state: GoodsState): Array<PriceCurrency> => state.AllPriceCurrencys
}

export { GoodGetters, getters }
