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
  CreateFeeRequest,
  CreateFeeResponse
} from './types'
import { GoodsState } from './state'
import { ActionTree } from 'vuex'
import { AugmentedActionContext, RootState } from '../index'
import { GoodMutations } from './mutations'
import { notificationPush, notificationPop } from '../notifications/helper'
import { MutationTypes as NotificationMutationTypes } from '../notifications/mutation-types'
import { Notification } from '../notifications/types'
import { api } from 'src/boot/axios'
import { API } from './const'
import { AxiosResponse } from 'axios'

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

  [ActionTypes.CreateFee]({
    commit
  }: AugmentedActionContext<
    GoodsState,
    RootState,
    GoodMutations<GoodsState>>,
    req: CreateFeeRequest): void
}

const actions: ActionTree<GoodsState, RootState> = {
  [ActionTypes.GetAllGoods] ({ commit }, req: GetAllGoodsRequest) {
    let waitingNotification: Notification
    if (req.Message.Waiting) {
      waitingNotification = notificationPush(req.Message.ModuleKey, req.Message.Waiting)
      commit(NotificationMutationTypes.Push, waitingNotification)
    }
    api
      .post<GetAllGoodsRequest, AxiosResponse<GetAllGoodsResponse>>(API.GET_ALL_GOODS, req)
      .then((response: AxiosResponse<GetAllGoodsResponse>) => {
        commit(MutationTypes.SetAllGoods, response.data.Details)
        if (waitingNotification) {
          commit(NotificationMutationTypes.Pop, notificationPop(waitingNotification))
        }
      })
      .catch((err: Error) => {
        const error = req.Message.Error
        if (error) {
          error.Description = err.message
          const errorNotification = notificationPush(req.Message.ModuleKey, error)
          commit(NotificationMutationTypes.Push, errorNotification)
        }
      })
  },

  [ActionTypes.GetAllDevices] ({ commit }, req: GetAllDevicesRequest) {
    let waitingNotification: Notification
    if (req.Message.Waiting) {
      waitingNotification = notificationPush(req.Message.ModuleKey, req.Message.Waiting)
      commit(NotificationMutationTypes.Push, waitingNotification)
    }
    api
      .post<GetAllDevicesRequest, AxiosResponse<GetAllDevicesResponse>>(API.GET_ALL_DEVICES, req)
      .then((response: AxiosResponse<GetAllDevicesResponse>) => {
        commit(MutationTypes.SetAllDevices, response.data.Infos)
        if (waitingNotification) {
          commit(NotificationMutationTypes.Pop, notificationPop(waitingNotification))
        }
      })
      .catch((err: Error) => {
        const error = req.Message.Error
        if (error) {
          error.Description = err.message
          const errorNotification = notificationPush(req.Message.ModuleKey, error)
          commit(NotificationMutationTypes.Push, errorNotification)
        }
      })
  },

  [ActionTypes.GetAllVendorLocations] ({ commit }, req: GetAllVendorLocationsRequest) {
    let waitingNotification: Notification
    if (req.Message.Waiting) {
      waitingNotification = notificationPush(req.Message.ModuleKey, req.Message.Waiting)
      commit(NotificationMutationTypes.Push, waitingNotification)
    }
    api
      .post<GetAllVendorLocationsRequest, AxiosResponse<GetAllVendorLocationsResponse>>(API.GET_ALL_VENDOR_LOCATIONS, req)
      .then((response: AxiosResponse<GetAllVendorLocationsResponse>) => {
        commit(MutationTypes.SetAllVendorLocations, response.data.Infos)
        if (waitingNotification) {
          commit(NotificationMutationTypes.Pop, notificationPop(waitingNotification))
        }
      })
      .catch((err: Error) => {
        const error = req.Message.Error
        if (error) {
          error.Description = err.message
          const errorNotification = notificationPush(req.Message.ModuleKey, error)
          commit(NotificationMutationTypes.Push, errorNotification)
        }
      })
  },

  [ActionTypes.CreateDevice] ({ commit }, req: CreateDeviceRequest) {
    let waitingNotification: Notification
    if (req.Message.Waiting) {
      waitingNotification = notificationPush(req.Message.ModuleKey, req.Message.Waiting)
      commit(NotificationMutationTypes.Push, waitingNotification)
    }
    api
      .post<CreateDeviceRequest, AxiosResponse<CreateDeviceResponse>>(API.CREATE_DEVICE, req)
      .then((response: AxiosResponse<CreateDeviceResponse>) => {
        commit(MutationTypes.AppendDevice, response.data.Info)
        if (waitingNotification) {
          commit(NotificationMutationTypes.Pop, notificationPop(waitingNotification))
        }
      })
      .catch((err: Error) => {
        const error = req.Message.Error
        if (error) {
          error.Description = err.message
          const errorNotification = notificationPush(req.Message.ModuleKey, error)
          commit(NotificationMutationTypes.Push, errorNotification)
        }
      })
  },

  [ActionTypes.CreateVendorLocation] ({ commit }, req: CreateVendorLocationRequest) {
    let waitingNotification: Notification
    if (req.Message.Waiting) {
      waitingNotification = notificationPush(req.Message.ModuleKey, req.Message.Waiting)
      commit(NotificationMutationTypes.Push, waitingNotification)
    }
    api
      .post<CreateVendorLocationRequest, AxiosResponse<CreateVendorLocationResponse>>(API.CREATE_VENDOR_LOCATION, req)
      .then((response: AxiosResponse<CreateVendorLocationResponse>) => {
        commit(MutationTypes.AppendVendorLocation, response.data.Info)
        if (waitingNotification) {
          commit(NotificationMutationTypes.Pop, notificationPop(waitingNotification))
        }
      })
      .catch((err: Error) => {
        const error = req.Message.Error
        if (error) {
          error.Description = err.message
          const errorNotification = notificationPush(req.Message.ModuleKey, error)
          commit(NotificationMutationTypes.Push, errorNotification)
        }
      })
  },

  [ActionTypes.GetAllFeeTypes] ({ commit }, req: GetAllFeeTypesRequest) {
    let waitingNotification: Notification
    if (req.Message.Waiting) {
      waitingNotification = notificationPush(req.Message.ModuleKey, req.Message.Waiting)
      commit(NotificationMutationTypes.Push, waitingNotification)
    }
    api
      .post<GetAllFeeTypesRequest, AxiosResponse<GetAllFeeTypesResponse>>(API.GET_ALL_FEE_TYPES, req)
      .then((response: AxiosResponse<GetAllFeeTypesResponse>) => {
        commit(MutationTypes.AppendVendorLocation, response.data.Infos)
        if (waitingNotification) {
          commit(NotificationMutationTypes.Pop, notificationPop(waitingNotification))
        }
      })
      .catch((err: Error) => {
        const error = req.Message.Error
        if (error) {
          error.Description = err.message
          const errorNotification = notificationPush(req.Message.ModuleKey, error)
          commit(NotificationMutationTypes.Push, errorNotification)
        }
      })
  },

  [ActionTypes.GetAllFees] ({ commit }, req: GetAllFeesRequest) {
    let waitingNotification: Notification
    if (req.Message.Waiting) {
      waitingNotification = notificationPush(req.Message.ModuleKey, req.Message.Waiting)
      commit(NotificationMutationTypes.Push, waitingNotification)
    }
    api
      .post<GetAllFeesRequest, AxiosResponse<GetAllFeesResponse>>(API.GET_ALL_FEES, req)
      .then((response: AxiosResponse<GetAllFeesResponse>) => {
        commit(MutationTypes.AppendVendorLocation, response.data.Infos)
        if (waitingNotification) {
          commit(NotificationMutationTypes.Pop, notificationPop(waitingNotification))
        }
      })
      .catch((err: Error) => {
        const error = req.Message.Error
        if (error) {
          error.Description = err.message
          const errorNotification = notificationPush(req.Message.ModuleKey, error)
          commit(NotificationMutationTypes.Push, errorNotification)
        }
      })
  },

  [ActionTypes.CreateFeeType] ({ commit }, req: CreateFeeTypeRequest) {
    let waitingNotification: Notification
    if (req.Message.Waiting) {
      waitingNotification = notificationPush(req.Message.ModuleKey, req.Message.Waiting)
      commit(NotificationMutationTypes.Push, waitingNotification)
    }
    api
      .post<CreateFeeTypeRequest, AxiosResponse<CreateFeeTypeResponse>>(API.CREATE_FEE_TYPE, req)
      .then((response: AxiosResponse<CreateFeeTypeResponse>) => {
        commit(MutationTypes.AppendVendorLocation, response.data.Info)
        if (waitingNotification) {
          commit(NotificationMutationTypes.Pop, notificationPop(waitingNotification))
        }
      })
      .catch((err: Error) => {
        const error = req.Message.Error
        if (error) {
          error.Description = err.message
          const errorNotification = notificationPush(req.Message.ModuleKey, error)
          commit(NotificationMutationTypes.Push, errorNotification)
        }
      })
  },

  [ActionTypes.CreateFee] ({ commit }, req: CreateFeeRequest) {
    let waitingNotification: Notification
    if (req.Message.Waiting) {
      waitingNotification = notificationPush(req.Message.ModuleKey, req.Message.Waiting)
      commit(NotificationMutationTypes.Push, waitingNotification)
    }
    api
      .post<CreateFeeRequest, AxiosResponse<CreateFeeResponse>>(API.CREATE_FEE, req)
      .then((response: AxiosResponse<CreateFeeResponse>) => {
        commit(MutationTypes.AppendVendorLocation, response.data.Info)
        if (waitingNotification) {
          commit(NotificationMutationTypes.Pop, notificationPop(waitingNotification))
        }
      })
      .catch((err: Error) => {
        const error = req.Message.Error
        if (error) {
          error.Description = err.message
          const errorNotification = notificationPush(req.Message.ModuleKey, error)
          commit(NotificationMutationTypes.Push, errorNotification)
        }
      })
  }
}

export {
  actions,
  GoodActions
}
