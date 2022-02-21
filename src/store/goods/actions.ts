import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'
import {
  CreateDeviceRequest,
  CreateDeviceResponse,
  CreateVendorLocationRequest,
  CreateVendorLocationResponse,
  GetAllDevicesRequest,
  GetAllDevicesResponse,
  GetAllGoodsRequest,
  GetAllGoodsResponse,
  GetAllVendorLocationsRequest,
  GetAllVendorLocationsResponse,
  GetAllFeeTypesRequest,
  GetAllFeeTypesResponse,
  CreateFeeTypeRequest,
  CreateFeeTypeResponse,
  GetAllFeesRequest,
  GetAllFeesResponse,
  CreateGoodRequest,
  CreateGoodResponse,
  GetAllPriceCurrencysRequest,
  CreatePriceCurrencyRequest,
  GetAllPriceCurrencysResponse,
  CreatePriceCurrencyResponse
} from './types'
import { GoodsState } from './state'
import { ActionTree } from 'vuex'
import { AugmentedActionContext, RootState } from '../index'
import { GoodMutations } from './mutations'
import { API } from './const'
import { doAction } from '../action'

interface GoodActions {
  [ActionTypes.GetAllGoods]({
    commit
  }: AugmentedActionContext<
    GoodsState,
    RootState,
    GoodMutations<GoodsState>>,
    req: GetAllGoodsRequest): void

  [ActionTypes.GetAllDevices]({
    commit
  }: AugmentedActionContext<
    GoodsState,
    RootState,
    GoodMutations<GoodsState>>,
    req: GetAllDevicesRequest): void

  [ActionTypes.GetAllVendorLocations]({
    commit
  }: AugmentedActionContext<
    GoodsState,
    RootState,
    GoodMutations<GoodsState>>,
    req: GetAllVendorLocationsRequest): void

  [ActionTypes.CreateDevice]({
    commit
  }: AugmentedActionContext<
    GoodsState,
    RootState,
    GoodMutations<GoodsState>>,
    req: CreateDeviceRequest): void

  [ActionTypes.CreateVendorLocation]({
    commit
  }: AugmentedActionContext<
    GoodsState,
    RootState,
    GoodMutations<GoodsState>>,
    req: CreateVendorLocationRequest): void

  [ActionTypes.GetAllFeeTypes]({
    commit
  }: AugmentedActionContext<
    GoodsState,
    RootState,
    GoodMutations<GoodsState>>,
    req: GetAllFeeTypesRequest): void

  [ActionTypes.CreateFeeType]({
    commit
  }: AugmentedActionContext<
    GoodsState,
    RootState,
    GoodMutations<GoodsState>>,
    req: CreateFeeTypeRequest): void

  [ActionTypes.GetAllFees]({
    commit
  }: AugmentedActionContext<
    GoodsState,
    RootState,
    GoodMutations<GoodsState>>,
    req: GetAllFeesRequest): void

  [ActionTypes.CreateGood]({
    commit
  }: AugmentedActionContext<
    GoodsState,
    RootState,
    GoodMutations<GoodsState>>,
    req: CreateGoodRequest): void

  [ActionTypes.GetAllPriceCurrencys]({
    commit
  }: AugmentedActionContext<
    GoodsState,
    RootState,
    GoodMutations<GoodsState>>,
    req: GetAllPriceCurrencysRequest): void

  [ActionTypes.CreatePriceCurrency]({
    commit
  }: AugmentedActionContext<
    GoodsState,
    RootState,
    GoodMutations<GoodsState>>,
    req: CreatePriceCurrencyRequest): void
}

const actions: ActionTree<GoodsState, RootState> = {
  [ActionTypes.GetAllGoods] ({ commit }, req: GetAllGoodsRequest) {
    doAction<GetAllGoodsRequest, GetAllGoodsResponse>(
      commit,
      API.GET_ALL_GOODS,
      req,
      req.Message,
      (resp: GetAllGoodsResponse): void => {
        commit(MutationTypes.SetAllGoods, resp.Infos)
      })
  },

  [ActionTypes.GetAllDevices] ({ commit }, req: GetAllDevicesRequest) {
    doAction<GetAllDevicesRequest, GetAllDevicesResponse>(
      commit,
      API.GET_ALL_DEVICES,
      req,
      req.Message,
      (resp: GetAllDevicesResponse): void => {
        commit(MutationTypes.SetAllGoods, resp.Infos)
      })
  },

  [ActionTypes.GetAllVendorLocations] ({ commit }, req: GetAllVendorLocationsRequest) {
    doAction<GetAllVendorLocationsRequest, GetAllVendorLocationsResponse>(
      commit,
      API.GET_ALL_VENDOR_LOCATIONS,
      req,
      req.Message,
      (resp: GetAllVendorLocationsResponse): void => {
        commit(MutationTypes.SetAllVendorLocations, resp.Infos)
      })
  },

  [ActionTypes.CreateDevice] ({ commit }, req: CreateDeviceRequest) {
    doAction<CreateDeviceRequest, CreateDeviceResponse>(
      commit,
      API.CREATE_DEVICE,
      req,
      req.Message,
      (resp: CreateDeviceResponse): void => {
        commit(MutationTypes.AppendDevice, resp.Info)
      })
  },

  [ActionTypes.CreateVendorLocation] ({ commit }, req: CreateVendorLocationRequest) {
    doAction<CreateVendorLocationRequest, CreateVendorLocationResponse>(
      commit,
      API.CREATE_VENDOR_LOCATION,
      req,
      req.Message,
      (resp: CreateVendorLocationResponse): void => {
        commit(MutationTypes.AppendVendorLocation, resp.Info)
      })
  },

  [ActionTypes.GetAllFeeTypes] ({ commit }, req: GetAllFeeTypesRequest) {
    doAction<GetAllFeeTypesRequest, GetAllFeeTypesResponse>(
      commit,
      API.GET_ALL_FEE_TYPES,
      req,
      req.Message,
      (resp: GetAllFeeTypesResponse): void => {
        commit(MutationTypes.SetAllFeeTypes, resp.Infos)
      })
  },

  [ActionTypes.GetAllFees] ({ commit }, req: GetAllFeesRequest) {
    doAction<GetAllFeesRequest, GetAllFeesResponse>(
      commit,
      API.GET_ALL_FEES,
      req,
      req.Message,
      (resp: GetAllFeesResponse): void => {
        commit(MutationTypes.SetAllFees, resp.Infos)
      })
  },

  [ActionTypes.CreateFeeType] ({ commit }, req: CreateFeeTypeRequest) {
    doAction<CreateFeeTypeRequest, CreateFeeTypeResponse>(
      commit,
      API.CREATE_FEE_TYPE,
      req,
      req.Message,
      (resp: CreateFeeTypeResponse): void => {
        commit(MutationTypes.AppendFeeType, resp.Info)
      })
  },

  [ActionTypes.CreateGood] ({ commit }, req: CreateGoodRequest) {
    doAction<CreateGoodRequest, CreateGoodResponse>(
      commit,
      API.CREATE_GOOD,
      req,
      req.Message,
      (resp: CreateGoodResponse): void => {
        commit(MutationTypes.AppendGood, resp.Info)
      })
  },

  [ActionTypes.GetAllPriceCurrencys] ({ commit }, req: GetAllPriceCurrencysRequest) {
    doAction<GetAllPriceCurrencysRequest, GetAllPriceCurrencysResponse>(
      commit,
      API.GET_ALL_PRICE_CURRENCYS,
      req,
      req.Message,
      (resp: GetAllPriceCurrencysResponse): void => {
        commit(MutationTypes.SetAllPriceCurrencys, resp.Infos)
      })
  },

  [ActionTypes.CreatePriceCurrency] ({ commit }, req: CreatePriceCurrencyRequest) {
    doAction<CreatePriceCurrencyRequest, CreatePriceCurrencyResponse>(
      commit,
      API.CREATE_PRICE_CURRENCY,
      req,
      req.Message,
      (resp: CreatePriceCurrencyResponse): void => {
        commit(MutationTypes.AppendPriceCurrency, resp.Info)
      })
  }
}

export {
  actions,
  GoodActions
}
