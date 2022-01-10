import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { GoodsState } from './state'
import { Good } from './types'

type GoodMutations<S = GoodsState> = {
  [MutationTypes.SetAllGoods] (state: S, payload: Array<Good>): void
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
  }
}

export { GoodMutations, mutations }
