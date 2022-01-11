import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { GoodsState } from './state'
import { DeviceInfo, Good } from './types'

type GoodGetters = {
  getGoodByID (state: GoodsState): (id: string) => Good
  getAllGoods (state: GoodsState): Array<Good>
  getAllDevices (state: GoodsState): Array<DeviceInfo>
}

const getters: GetterTree<GoodsState, RootState> & GoodGetters = {
  getGoodByID: (state: GoodsState): (id: string) => Good => {
    return (id: string) => state.AllGoods.get(id) as Good
  },
  getAllGoods: (state: GoodsState): Array<Good> => {
    const goods: Array<Good> = []
    state.AllGoods.forEach((val) => {
      goods.push(val)
    })
    return goods
  },
  getAllDevices: (state: GoodsState): Array<DeviceInfo> => state.AllDevices
}

export { GoodGetters, getters }
