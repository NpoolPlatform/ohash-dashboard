import { Coin } from '../coins/types'
import { ReqMessage } from '../notifications/types'

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
  ID?: string
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
  ID?: string
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

interface PriceCurrency {
  ID?: string
  Name: string
  Unit: string
  Symbol: string
}

interface GetAllPriceCurrencysRequest {
  Message: ReqMessage
}

interface GetAllPriceCurrencysResponse {
  Infos: Array<PriceCurrency>
}

interface CreatePriceCurrencyRequest {
  Info: PriceCurrency
  Message: ReqMessage
}

interface CreatePriceCurrencyResponse {
  Info: Fee
}

interface GoodExtra {
  ID: string
  GoodID: string
  Labels: Array<string>
  OutSale: boolean
  Posters: Array<string>
  PreSale: false
  Rating: number
  VoteCount: number
}

interface GoodBase {
  ID?: string
  SeparateFee: boolean
  UnitPower: number
  DurationDays: number
  Actuals: boolean
  DeliveryAt: number
  Price: number
  BenefitType: string
  Classic: boolean
  Title: string
  Total: number
  Unit: string
}

interface Good extends GoodBase {
  PriceCurrency: string
  CoinInfoID: string
  DeviceInfoID: string,
  InheritFromGoodID: string
  VendorLocationID: string
  SupportCoinTypeIDs: Array<string>
  FeeIDs: Array<string>
}

interface CreateGoodRequest {
  Info: Good
  Message: ReqMessage
}

interface CreateGoodResponse {
  Info: Good
}

interface GoodDetail extends GoodBase {
  CoinInfo: Coin
  DeviceInfo: DeviceInfo
  VendorLocation: VendorLocation
  Fees: Array<Fee>
  PriceCurrency: Coin
  Extra: GoodExtra
}

interface GetAllGoodsRequest {
  Message: ReqMessage
}

interface GetAllGoodsResponse {
  Details: ReadonlyArray<GoodDetail>
}

export {
  Good,
  GoodDetail,
  GoodBase,
  CreateGoodRequest,
  CreateGoodResponse,
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
  CreateFeeResponse,
  PriceCurrency,
  GetAllPriceCurrencysRequest,
  GetAllPriceCurrencysResponse,
  CreatePriceCurrencyRequest,
  CreatePriceCurrencyResponse
}
