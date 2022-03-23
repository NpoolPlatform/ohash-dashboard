import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'
import { InspiresState } from './state'
import { ActionTree } from 'vuex'
import { AugmentedActionContext, RootState } from '../index'
import { InspireMutations } from './mutations'
import { API } from './const'
import { doAction } from '../action'
import {
  CreateAppCommissionSettingRequest,
  CreateAppCommissionSettingResponse,
  CreateAppPurchaseAmountSettingForAppOtherUserRequest,
  CreateAppPurchaseAmountSettingForAppOtherUserResponse,
  CreateAppPurchaseAmountSettingRequest,
  CreateAppPurchaseAmountSettingResponse,
  CreateUserInvitationCodeForAppOtherUserRequest,
  CreateUserInvitationCodeForAppOtherUserResponse,
  GetAppCommissionSettingRequest,
  GetAppCommissionSettingResponse,
  GetAppPurchaseAmountSettingsRequest,
  GetAppPurchaseAmountSettingsResponse,
  GetCommissionCoinSettingsRequest,
  GetCommissionCoinSettingsResponse,
  GetUserInvitationCodesRequest,
  GetUserInvitationCodesResponse,
  UpdateAppCommissionSettingRequest,
  UpdateAppCommissionSettingResponse
} from './types'

interface InspireActions {
  [ActionTypes.GetUserInvitationCodes]({
    commit
  }: AugmentedActionContext<
  InspiresState,
    RootState,
    InspireMutations<InspiresState>>,
    req: GetUserInvitationCodesRequest): void

  [ActionTypes.CreateUserInvitationCodeForAppOtherUser]({
    commit
  }: AugmentedActionContext<
  InspiresState,
    RootState,
    InspireMutations<InspiresState>>,
    req: CreateUserInvitationCodeForAppOtherUserRequest): void

  [ActionTypes.CreateAppCommissionSetting]({
    commit
  }: AugmentedActionContext<
  InspiresState,
    RootState,
    InspireMutations<InspiresState>>,
    req: CreateAppCommissionSettingRequest): void

  [ActionTypes.UpdateAppCommissionSetting]({
    commit
  }: AugmentedActionContext<
  InspiresState,
    RootState,
    InspireMutations<InspiresState>>,
    req: UpdateAppCommissionSettingRequest): void

  [ActionTypes.GetAppCommissionSetting]({
    commit
  }: AugmentedActionContext<
  InspiresState,
    RootState,
    InspireMutations<InspiresState>>,
    req: GetAppCommissionSettingRequest): void

  [ActionTypes.CreateAppPurchaseAmountSetting]({
    commit
  }: AugmentedActionContext<
  InspiresState,
    RootState,
    InspireMutations<InspiresState>>,
    req: CreateAppPurchaseAmountSettingRequest): void

  [ActionTypes.CreateAppPurchaseAmountSettingForAppOtherUser]({
    commit
  }: AugmentedActionContext<
  InspiresState,
    RootState,
    InspireMutations<InspiresState>>,
    req: CreateAppPurchaseAmountSettingForAppOtherUserRequest): void

  [ActionTypes.GetAppPurchaseAmountSettings]({
    commit
  }: AugmentedActionContext<
  InspiresState,
    RootState,
    InspireMutations<InspiresState>>,
    req: GetAppPurchaseAmountSettingsRequest): void

  [ActionTypes.GetCommissionCoinSettings]({
    commit
  }: AugmentedActionContext<
    InspiresState,
    RootState,
    InspireMutations<InspiresState>>,
    req: GetCommissionCoinSettingsRequest): void
}

const actions: ActionTree<InspiresState, RootState> = {
  [ActionTypes.GetUserInvitationCodes] ({ commit }, req: GetUserInvitationCodesRequest) {
    doAction<GetUserInvitationCodesRequest, GetUserInvitationCodesResponse>(
      commit,
      API.GET_USER_INVITATION_CODES,
      req,
      req.Message,
      (resp: GetUserInvitationCodesResponse): void => {
        commit(MutationTypes.SetUserInvitationCodes, resp.Infos)
      })
  },

  [ActionTypes.CreateUserInvitationCodeForAppOtherUser] ({ commit }, req: CreateUserInvitationCodeForAppOtherUserRequest) {
    doAction<CreateUserInvitationCodeForAppOtherUserRequest, CreateUserInvitationCodeForAppOtherUserResponse>(
      commit,
      API.CREATE_USER_INVITATION_CODE_FOR_APP_OTHER_USER,
      req,
      req.Message,
      (resp: CreateUserInvitationCodeForAppOtherUserResponse): void => {
        commit(MutationTypes.AppendUserInvitationCode, resp.Info)
      })
  },

  [ActionTypes.CreateAppCommissionSetting] ({ commit }, req: CreateAppCommissionSettingRequest) {
    doAction<CreateAppCommissionSettingRequest, CreateAppCommissionSettingResponse>(
      commit,
      API.CREATE_APP_COMMISSION_SETTING,
      req,
      req.Message,
      (resp: CreateAppCommissionSettingResponse): void => {
        commit(MutationTypes.SetAppCommissionSetting, resp.Info)
      })
  },

  [ActionTypes.UpdateAppCommissionSetting] ({ commit }, req: UpdateAppCommissionSettingRequest) {
    doAction<UpdateAppCommissionSettingRequest, UpdateAppCommissionSettingResponse>(
      commit,
      API.UPDATE_APP_COMMISSION_SETTING,
      req,
      req.Message,
      (resp: UpdateAppCommissionSettingResponse): void => {
        commit(MutationTypes.SetAppCommissionSetting, resp.Info)
      })
  },

  [ActionTypes.GetAppCommissionSetting] ({ commit }, req: GetAppCommissionSettingRequest) {
    doAction<GetAppCommissionSettingRequest, GetAppCommissionSettingResponse>(
      commit,
      API.GET_APP_COMMISSION_SETTING,
      req,
      req.Message,
      (resp: GetAppCommissionSettingResponse): void => {
        commit(MutationTypes.SetAppCommissionSetting, resp.Info)
      })
  },

  [ActionTypes.CreateAppPurchaseAmountSetting] ({ commit }, req: CreateAppPurchaseAmountSettingRequest) {
    doAction<CreateAppPurchaseAmountSettingRequest, CreateAppPurchaseAmountSettingResponse>(
      commit,
      API.CREATE_APP_PURCHASE_AMOUNT_SETTING,
      req,
      req.Message,
      (resp: CreateAppPurchaseAmountSettingResponse): void => {
        commit(MutationTypes.AppendAppPurchaseAmountSetting, resp.Info)
      })
  },

  [ActionTypes.GetAppPurchaseAmountSettings] ({ commit }, req: GetAppPurchaseAmountSettingsRequest) {
    doAction<GetAppPurchaseAmountSettingsRequest, GetAppPurchaseAmountSettingsResponse>(
      commit,
      API.GET_APP_PURCHASE_AMOUNT_SETTINGS,
      req,
      req.Message,
      (resp: GetAppPurchaseAmountSettingsResponse): void => {
        commit(MutationTypes.SetAppPurchaseAmountSettings, resp.Infos)
      })
  },

  [ActionTypes.CreateAppPurchaseAmountSettingForAppOtherUser] ({ commit }, req: CreateAppPurchaseAmountSettingForAppOtherUserRequest) {
    doAction<CreateAppPurchaseAmountSettingForAppOtherUserRequest, CreateAppPurchaseAmountSettingForAppOtherUserResponse>(
      commit,
      API.CREATE_APP_PURCHASE_AMOUNT_SETTING_FOR_APP_OTHER_USER,
      req,
      req.Message,
      (resp: CreateAppPurchaseAmountSettingForAppOtherUserResponse): void => {
        commit(MutationTypes.AppendAppPurchaseAmountSetting, resp.Info)
      })
  },

  [ActionTypes.GetCommissionCoinSettings] ({ commit }, req: GetCommissionCoinSettingsRequest) {
    doAction<GetCommissionCoinSettingsRequest, GetCommissionCoinSettingsResponse>(
      commit,
      API.GET_COMMISSION_COINS_SETTINGS,
      req,
      req.Message,
      (resp: GetCommissionCoinSettingsResponse): void => {
        commit(MutationTypes.SetCommissionCoins, resp.Infos)
      })
  }
}

export {
  actions,
  InspireActions
}
