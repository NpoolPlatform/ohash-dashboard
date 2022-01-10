import { Good } from './types'

interface GoodsState {
  AllGoods: Map<string, Good>
}

function state (): GoodsState {
  return {
    AllGoods: new Map<string, Good>()
  }
}

export {
  state,
  GoodsState
}
