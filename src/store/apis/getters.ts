import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { APIsState } from './state'
import { API } from './types'

type APIGetters = {
  getAPIs (state: APIsState): Array<API>
}

const getters: GetterTree<APIsState, RootState> & APIGetters = {
  getAPIs: (state: APIsState): Array<API> => state.APIs
}

export { APIGetters, getters }
