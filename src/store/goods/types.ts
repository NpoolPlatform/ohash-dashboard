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
  ID: string
  Manufacturer: string
  Consumption: number
  ShipmentAt: number
  Type: string
}

interface GetAllDevicesRequest {
  Message: ReqMessage
}

interface GetAllDevicesResponse {
  Infos: ReadonlyArray<DeviceInfo>
}

interface VendorLocation {
  ID: string
  Country: string
  Province: string
  City: string
  Address: string
}

interface GetAllVendorLocationsRequest {
  Message: ReqMessage
}

interface GetAllVendorLocationsResponse {
  Infos: ReadonlyArray<VendorLocation>
}

export {
  Good,
  GetAllGoodsRequest,
  GetAllGoodsResponse,
  DeviceInfo,
  GetAllDevicesRequest,
  GetAllDevicesResponse,
  VendorLocation,
  GetAllVendorLocationsRequest,
  GetAllVendorLocationsResponse
}
