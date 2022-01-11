import { ReqMessage } from '../notifications/types'

interface Good {
  ID: string
  BenefitType: string
  Title: string
  Total: number
  Price: number
  MyInfo: unknown
}

interface GetAllGoodsResponse {
  Details: ReadonlyArray<Good>
}

interface GetAllGoodsRequest {
  Message: ReqMessage
}

interface DeviceInfo {
  Manufacturer: string
  Consumption: number
  ShipmentAt: number
  Type: string
}

export {
  Good,
  GetAllGoodsRequest,
  GetAllGoodsResponse,
  DeviceInfo
}
