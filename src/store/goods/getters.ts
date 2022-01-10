import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { GoodsState } from './state'
import { Good } from './types'

type GoodGetters = {
  getGoodByID (state: GoodsState): (id: string) => Good
  getAllGoods (state: GoodsState): Array<Good>
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
  }
}

export { GoodGetters, getters }
