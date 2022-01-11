import { DeviceInfo, Good } from './types'

interface GoodsState {
  AllGoods: Map<string, Good>
  AllDevices: Array<DeviceInfo>
}

function state (): GoodsState {
  return {
    AllGoods: new Map<string, Good>(),
    AllDevices: []
  }
}

export {
  state,
  GoodsState
}
