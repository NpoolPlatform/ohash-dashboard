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
  ID?: string
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

interface CreateDeviceRequest {
  Info: DeviceInfo
  Message: ReqMessage
}

interface CreateDeviceResponse {
  Info: DeviceInfo
}

interface VendorLocation {
  ID?: string
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

interface CreateVendorLocationRequest {
  Info: VendorLocation
  Message: ReqMessage
}

interface CreateVendorLocationResponse {
  Info: VendorLocation
}

interface FeeType {
  ID: string
  FeeType: string
  FeeDescription: string
  PayType: string
}

interface GetAllFeeTypesRequest {
  Message: ReqMessage
}

interface GetAllFeeTypesResponse {
  Infos: Array<FeeType>
}

interface CreateFeeTypeRequest {
  Info: FeeType
  Message: ReqMessage
}

interface CreateFeeTypeResponse {
  Info: FeeType
}

interface Fee {
  ID: string
  AppID: string
  FeeTypeID: string
  Value: number
}

interface GetAllFeesRequest {
  Message: ReqMessage
}

interface GetAllFeesResponse {
  Infos: Array<Fee>
}

interface CreateFeeRequest {
  Info: Fee
  Message: ReqMessage
}

interface CreateFeeResponse {
  Info: Fee
}

export {
  Good,
  GetAllGoodsRequest,
  GetAllGoodsResponse,
  DeviceInfo,
  GetAllDevicesRequest,
  GetAllDevicesResponse,
  CreateDeviceRequest,
  CreateDeviceResponse,
  VendorLocation,
  GetAllVendorLocationsRequest,
  GetAllVendorLocationsResponse,
  CreateVendorLocationRequest,
  CreateVendorLocationResponse,
  FeeType,
  GetAllFeeTypesRequest,
  GetAllFeeTypesResponse,
  CreateFeeTypeRequest,
  CreateFeeTypeResponse,
  Fee,
  GetAllFeesRequest,
  GetAllFeesResponse,
  CreateFeeRequest,
  CreateFeeResponse
}
