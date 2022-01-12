import { ReqMessage } from '../notifications/types'

interface Coin {
  ID: string
  Name: string
  PreSale: boolean
  Unit: string
  Logo: string
}

interface GetCoinsResponse {
  Infos: ReadonlyArray<Coin>
}

interface GetCoinsRequest {
  Message: ReqMessage
}

export {
  Coin,
  GetCoinsRequest,
  GetCoinsResponse
}
