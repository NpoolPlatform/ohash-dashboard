import { API } from './types'

interface APIsState {
  APIs: Array<API>
}

function state (): APIsState {
  return {
    APIs: [] as Array<API>
  }
}

export {
  state,
  APIsState
}
