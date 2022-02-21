import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'
import {
  CreateAppControlRequest,
  CreateAppControlResponse,
  CreateApplicationRequest,
  CreateApplicationResponse,
  CreateAppRoleRequest,
  CreateAppRoleResponse,
  CreateAppWithdrawSettingRequest,
  CreateAppWithdrawSettingResponse,
  CreateRecommendRequest,
  CreateRecommendResponse,
  GetAppGoodsRequest,
  GetAppGoodsResponse,
  GetApplicationRequest,
  GetApplicationResponse,
  GetAppRolesRequest,
  GetAppRolesResponse,
  GetAppWithdrawSettingsRequest,
  GetAppWithdrawSettingsResponse,
  GetRecommendsRequest,
  GetRecommendsResponse,
  SetAppGoodOfflineRequest,
  SetAppGoodOfflineResponse,
  SetAppGoodOnlineRequest,
  SetAppGoodOnlineResponse,
  SetAppGoodPriceRequest,
  SetAppGoodPriceResponse,
  UpdateAppControlRequest,
  UpdateAppControlResponse,
  UpdateApplicationRequest,
  UpdateApplicationResponse,
  UpdateAppRoleRequest,
  UpdateAppRoleResponse,
  UpdateAppWithdrawSettingRequest,
  UpdateAppWithdrawSettingResponse
} from './types'
import { ApplicationState } from './state'
import { ActionTree } from 'vuex'
import { AugmentedActionContext, RootState } from '../index'
import { ApplicationMutations } from './mutations'
import { API } from './const'
import { doAction } from '../action'

interface ApplicationActions {
  [ActionTypes.GetApplication]({
    commit
  }: AugmentedActionContext<
    ApplicationState,
    RootState,
    ApplicationMutations<ApplicationState>>,
    req: GetApplicationRequest): void

  [ActionTypes.CreateApplication]({
    commit
  }: AugmentedActionContext<
    ApplicationState,
    RootState,
    ApplicationMutations<ApplicationState>>,
    req: CreateApplicationRequest): void

  [ActionTypes.UpdateApplication]({
    commit
  }: AugmentedActionContext<
    ApplicationState,
    RootState,
    ApplicationMutations<ApplicationState>>,
    req: UpdateApplicationRequest): void

  [ActionTypes.CreateAppControl]({
    commit
  }: AugmentedActionContext<
    ApplicationState,
    RootState,
    ApplicationMutations<ApplicationState>>,
    req: CreateAppControlRequest): void

  [ActionTypes.UpdateAppControl]({
    commit
  }: AugmentedActionContext<
    ApplicationState,
    RootState,
    ApplicationMutations<ApplicationState>>,
    req: UpdateAppControlRequest): void

  [ActionTypes.GetAppRoles]({
    commit
  }: AugmentedActionContext<
    ApplicationState,
    RootState,
    ApplicationMutations<ApplicationState>>,
    req: GetAppRolesRequest): void

  [ActionTypes.CreateAppRole]({
    commit
  }: AugmentedActionContext<
    ApplicationState,
    RootState,
    ApplicationMutations<ApplicationState>>,
    req: CreateAppRoleRequest): void

  [ActionTypes.UpdateAppRole]({
    commit
  }: AugmentedActionContext<
    ApplicationState,
    RootState,
    ApplicationMutations<ApplicationState>>,
    req: UpdateAppRoleRequest): void

  [ActionTypes.GetAppGoods]({
    commit
  }: AugmentedActionContext<
    ApplicationState,
    RootState,
    ApplicationMutations<ApplicationState>>,
    req: GetAppGoodsRequest): void

  [ActionTypes.GetRecommends]({
    commit
  }: AugmentedActionContext<
    ApplicationState,
    RootState,
    ApplicationMutations<ApplicationState>>,
    req: GetRecommendsRequest): void

  [ActionTypes.CreateRecommend]({
    commit
  }: AugmentedActionContext<
    ApplicationState,
    RootState,
    ApplicationMutations<ApplicationState>>,
    req: CreateRecommendRequest): void

  [ActionTypes.SetAppGoodPrice]({
    commit
  }: AugmentedActionContext<
    ApplicationState,
    RootState,
    ApplicationMutations<ApplicationState>>,
    req: SetAppGoodPriceRequest): void

  [ActionTypes.OnsaleAppGood]({
    commit
  }: AugmentedActionContext<
    ApplicationState,
    RootState,
    ApplicationMutations<ApplicationState>>,
    req: SetAppGoodOnlineRequest): void

  [ActionTypes.OffsaleAppGood]({
    commit
  }: AugmentedActionContext<
    ApplicationState,
    RootState,
    ApplicationMutations<ApplicationState>>,
    req: SetAppGoodOfflineRequest): void

  [ActionTypes.GetAppWithdrawSettings]({
    commit
  }: AugmentedActionContext<
    ApplicationState,
    RootState,
    ApplicationMutations<ApplicationState>>,
    req: GetAppWithdrawSettingsRequest): void

  [ActionTypes.CreateAppWithdrawSetting]({
    commit
  }: AugmentedActionContext<
    ApplicationState,
    RootState,
    ApplicationMutations<ApplicationState>>,
    req: CreateAppWithdrawSettingRequest): void

  [ActionTypes.UpdateAppWithdrawSetting]({
    commit
  }: AugmentedActionContext<
    ApplicationState,
    RootState,
    ApplicationMutations<ApplicationState>>,
    req: UpdateAppWithdrawSettingRequest): void
}

const actions: ActionTree<ApplicationState, RootState> = {
  [ActionTypes.GetApplication] ({ commit }, req: GetApplicationRequest) {
    doAction<GetApplicationRequest, GetApplicationResponse>(
      commit,
      API.GET_APPLICATION,
      req,
      req.Message,
      (resp: GetApplicationResponse): void => {
        commit(MutationTypes.SetApplication, resp.Info)
      })
  },

  [ActionTypes.CreateApplication] ({ commit }, req: CreateApplicationRequest) {
    doAction<CreateApplicationRequest, CreateApplicationResponse>(
      commit,
      API.CREATE_APPLICATION,
      req,
      req.Message,
      (resp: CreateApplicationResponse): void => {
        commit(MutationTypes.SetApplication, resp.Info)
      })
  },

  [ActionTypes.UpdateApplication] ({ commit }, req: UpdateApplicationRequest) {
    doAction<UpdateApplicationRequest, UpdateApplicationResponse>(
      commit,
      API.UPDATE_APPLICATION,
      req,
      req.Message,
      (resp: UpdateApplicationResponse): void => {
        commit(MutationTypes.SetApplication, resp.Info)
      })
  },

  [ActionTypes.UpdateAppControl] ({ commit }, req: UpdateAppControlRequest) {
    doAction<UpdateAppControlRequest, UpdateAppControlResponse>(
      commit,
      API.UPDATE_APP_CONTROL,
      req,
      req.Message,
      (resp: UpdateAppControlResponse): void => {
        commit(MutationTypes.SetAppControl, resp.Info)
      })
  },

  [ActionTypes.CreateAppControl] ({ commit }, req: CreateAppControlRequest) {
    doAction<CreateAppControlRequest, CreateAppControlResponse>(
      commit,
      API.CREATE_APP_CONTROL,
      req,
      req.Message,
      (resp: CreateAppControlResponse): void => {
        commit(MutationTypes.SetAppControl, resp.Info)
      })
  },

  [ActionTypes.GetAppRoles] ({ commit }, req: GetAppRolesRequest) {
    doAction<GetAppRolesRequest, GetAppRolesResponse>(
      commit,
      API.GET_APP_ROLES,
      req,
      req.Message,
      (resp: GetAppRolesResponse): void => {
        commit(MutationTypes.SetAppRoles, resp.Infos)
      })
  },

  [ActionTypes.CreateAppRole] ({ commit }, req: CreateAppRoleRequest) {
    doAction<CreateAppRoleRequest, CreateAppRoleResponse>(
      commit,
      API.CREATE_APP_ROLE,
      req,
      req.Message,
      (resp: CreateAppRoleResponse): void => {
        commit(MutationTypes.SetAppRole, resp.Info)
      })
  },

  [ActionTypes.UpdateAppRole] ({ commit }, req: UpdateAppRoleRequest) {
    doAction<UpdateAppRoleRequest, UpdateAppRoleResponse>(
      commit,
      API.UPDATE_APP_ROLE,
      req,
      req.Message,
      (resp: UpdateAppRoleResponse): void => {
        commit(MutationTypes.SetAppRole, resp.Info)
      })
  },

  [ActionTypes.GetAppGoods] ({ commit }, req: GetAppGoodsRequest) {
    doAction<GetAppGoodsRequest, GetAppGoodsResponse>(
      commit,
      API.GET_APP_GOODS,
      req,
      req.Message,
      (resp: GetAppGoodsResponse): void => {
        commit(MutationTypes.SetAppGoods, resp.Infos)
      })
  },

  [ActionTypes.GetRecommends] ({ commit }, req: GetRecommendsRequest) {
    doAction<GetRecommendsRequest, GetRecommendsResponse>(
      commit,
      API.GET_RECOMMENDS,
      req,
      req.Message,
      (resp: GetRecommendsResponse): void => {
        commit(MutationTypes.SetRecommends, resp.Infos)
      })
  },

  [ActionTypes.CreateRecommend] ({ commit }, req: CreateRecommendRequest) {
    doAction<CreateRecommendRequest, CreateRecommendResponse>(
      commit,
      API.CREATE_RECOMMEND,
      req,
      req.Message,
      (resp: CreateRecommendResponse): void => {
        commit(MutationTypes.SetRecommends, [resp.Info])
      })
  },

  [ActionTypes.SetAppGoodPrice] ({ commit }, req: SetAppGoodPriceRequest) {
    doAction<SetAppGoodPriceRequest, SetAppGoodPriceResponse>(
      commit,
      API.SET_APP_GOOD_PRICE,
      req,
      req.Message,
      (resp: SetAppGoodPriceResponse): void => {
        commit(MutationTypes.SetAppGoods, [resp.Info])
      })
  },

  [ActionTypes.OnsaleAppGood] ({ commit }, req: SetAppGoodOnlineRequest) {
    doAction<SetAppGoodOnlineRequest, SetAppGoodOnlineResponse>(
      commit,
      API.ONSALE_APP_GOOD,
      req,
      req.Message,
      (resp: SetAppGoodOnlineResponse): void => {
        commit(MutationTypes.SetAppGoods, [resp.Info])
      })
  },

  [ActionTypes.OffsaleAppGood] ({ commit }, req: SetAppGoodOfflineRequest) {
    doAction<SetAppGoodOfflineRequest, SetAppGoodOfflineResponse>(
      commit,
      API.OFFSALE_APP_GOOD,
      req,
      req.Message,
      (resp: SetAppGoodOfflineResponse): void => {
        commit(MutationTypes.SetAppGoods, [resp.Info])
      })
  },

  [ActionTypes.GetAppWithdrawSettings] ({ commit }, req: GetAppWithdrawSettingsRequest) {
    doAction<GetAppWithdrawSettingsRequest, GetAppWithdrawSettingsResponse>(
      commit,
      API.GET_APP_WITHDRAW_SETTINGS,
      req,
      req.Message,
      (resp: GetAppWithdrawSettingsResponse): void => {
        commit(MutationTypes.SetAppWithdrawSettings, resp.Infos)
      })
  },

  [ActionTypes.CreateAppWithdrawSetting] ({ commit }, req: CreateAppWithdrawSettingRequest) {
    doAction<CreateAppWithdrawSettingRequest, CreateAppWithdrawSettingResponse>(
      commit,
      API.CREATE_APP_WITHDRAW_SETTING,
      req,
      req.Message,
      (resp: CreateAppWithdrawSettingResponse): void => {
        commit(MutationTypes.SetAppWithdrawSettings, [resp.Info])
      })
  },

  [ActionTypes.UpdateAppWithdrawSetting] ({ commit }, req: UpdateAppWithdrawSettingRequest) {
    doAction<UpdateAppWithdrawSettingRequest, UpdateAppWithdrawSettingResponse>(
      commit,
      API.UPDATE_APP_WITHDRAW_SETTING,
      req,
      req.Message,
      (resp: UpdateAppWithdrawSettingResponse): void => {
        commit(MutationTypes.SetAppWithdrawSettings, [resp.Info])
      })
  }
}

export {
  actions,
  ApplicationActions
}
