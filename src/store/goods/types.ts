import { ReqMessage } from '../notifications/types'

interface Good {
  ID: string
}

interface GetAllGoodsResponse {
  Infos: ReadonlyArray<Good>
}

interface GetAllGoodsRequest {
  Message: ReqMessage
}

export {
  Good,
  GetAllGoodsRequest,
  GetAllGoodsResponse
}
