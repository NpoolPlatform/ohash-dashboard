import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { GoodsState } from './state'
import { DeviceInfo, Fee, FeeType, Good, VendorLocation } from './types'

type GoodMutations<S = GoodsState> = {
  [MutationTypes.SetAllGoods] (state: S, payload: Array<Good>): void
  [MutationTypes.SetAllDevices] (state: S, payload: Array<DeviceInfo>): void
  [MutationTypes.SetAllVendorLocations] (state: S, payload: Array<VendorLocation>): void
  [MutationTypes.AppendDevice] (state: S, payload: DeviceInfo): void
  [MutationTypes.AppendVendorLocation] (state: S, payload: VendorLocation): void
  [MutationTypes.SetAllFeeTypes] (state: S, payload: Array<FeeType>): void
  [MutationTypes.SetAllFees] (state: S, payload: Array<Fee>): void
  [MutationTypes.AppendFeeType] (state: S, payload: FeeType): void
  [MutationTypes.AppendFee] (state: S, payload: Fee): void
}

const mutations: MutationTree<GoodsState> & GoodMutations = {
  [MutationTypes.SetAllGoods] (state: GoodsState, payload: Array<Good>) {
    payload.forEach((good) => {
      state.AllGoods.set(good.ID, {
        ID: good.ID,
        BenefitType: good.BenefitType,
        Title: good.Title,
        Total: good.Total,
        Price: good.Price,
        MyInfo: good
      })
    })
  },

  [MutationTypes.SetAllDevices] (state: GoodsState, payload: Array<DeviceInfo>) {
    state.AllDevices = payload
  },

  [MutationTypes.SetAllVendorLocations] (state: GoodsState, payload: Array<VendorLocation>): void {
    state.AllVendorLocations = payload
  },

  [MutationTypes.AppendDevice] (state: GoodsState, payload: DeviceInfo): void {
    state.AllDevices.splice(0, 0, payload)
  },

  [MutationTypes.AppendVendorLocation] (state: GoodsState, payload: VendorLocation): void {
    state.AllVendorLocations.splice(0, 0, payload)
  },

  [MutationTypes.SetAllFeeTypes] (state: GoodsState, payload: Array<FeeType>): void {
    state.AllFeeTypes = payload
  },

  [MutationTypes.SetAllFees] (state: GoodsState, payload: Array<Fee>): void {
    state.AllFees = payload
  },

  [MutationTypes.AppendFeeType] (state: GoodsState, payload: FeeType): void {
    state.AllFeeTypes.splice(0, 0, payload)
  },

  [MutationTypes.AppendFee] (state: GoodsState, payload: Fee): void {
    state.AllFees.splice(0, 0, payload)
  }
}

export { GoodMutations, mutations }
