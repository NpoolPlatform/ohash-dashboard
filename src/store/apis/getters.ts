import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { APIsState } from './state'
import { API, ExpandAPI } from './types'

type APIGetters = {
  getAPIs (state: APIsState): Array<API>
  getExpandAPIs (state: APIsState): Array<ExpandAPI>
}

const getters: GetterTree<APIsState, RootState> & APIGetters = {
  getAPIs: (state: APIsState): Array<API> => state.APIs,
  getExpandAPIs (state: APIsState): Array<ExpandAPI> {
    const apis = [] as Array<ExpandAPI>
    state.APIs.forEach((api) => {
      apis.push({
        ID: api.ID,
        ServiceName: api.ServiceName,
        Domains: api.Domains.join(','),
        Path: api.Path,
        Exported: api.Exported,
        PathPrefix: api.PathPrefix,
        CreateAt: api.CreateAt,
        UpdateAt: api.UpdateAt,
        Protocol: api.Protocol,
        Method: api.Method
      })
    })
    return apis
  }
}

export { APIGetters, getters }
