import { ReqMessage } from '../notifications/types'

interface Good {
  ID: string
  BenefitType: string
  Title: string
  Total: number
  Price: number
  MyInfo: unknown
}

interface GetAllGoodsRequest {
  Message: ReqMessage
}

interface GetAllGoodsResponse {
  Details: ReadonlyArray<Good>
}

interface DeviceInfo {
  Manufacturer: string
  Consumption: number
  ShipmentAt: number
  Type: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface GetAllDevicesRequest {
  Message: ReqMessage
}

interface GetAllDevicesResponse {
  Infos: ReadonlyArray<DeviceInfo>
}

export {
  Good,
  GetAllGoodsRequest,
  GetAllGoodsResponse,
  DeviceInfo,
  GetAllDevicesRequest,
  GetAllDevicesResponse
}
