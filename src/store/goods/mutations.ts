import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { GoodsState } from './state'
import { Good } from './types'

type GoodMutations<S = GoodsState> = {
  [MutationTypes.SetAllGoods] (state: S, payload: Array<Good>): void
}

const mutations: MutationTree<GoodsState> & GoodMutations = {
  [MutationTypes.SetAllGoods] (state: GoodsState, payload: Array<Good>) {
    payload.forEach((app) => {
      state.AllGoods.set(app.ID, app)
    })
  }
}

export { GoodMutations, mutations }
