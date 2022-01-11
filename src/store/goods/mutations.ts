import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { GoodsState } from './state'
import { DeviceInfo, Good, VendorLocation } from './types'

type GoodMutations<S = GoodsState> = {
  [MutationTypes.SetAllGoods] (state: S, payload: Array<Good>): void
  [MutationTypes.SetAllDevices] (state: S, payload: Array<DeviceInfo>): void
  [MutationTypes.SetAllVendorLocations] (state: S, payload: Array<VendorLocation>): void
  [MutationTypes.AppendDevice] (state: S, payload: DeviceInfo): void
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
    const devices = [payload]
    state.AllDevices.forEach((device) => {
      devices.push(device)
    })
    state.AllDevices = devices
  }
}

export { GoodMutations, mutations }
