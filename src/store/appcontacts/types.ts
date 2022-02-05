import { ReqMessage } from '../notifications/types'

interface AppContact {
  ID?: string
  AppID: string
  UsedFor: string
  Account: string
  AccountType: string
}

interface GetAppContactsByAppRequest {
  AppID: string
  Message: ReqMessage
}

interface GetAppContactsByAppResponse {
  Infos: ReadonlyArray<AppContact>
}

interface GetAppContactsByOtherAppRequest {
  TargetAppID: string
  Message: ReqMessage
}

interface GetAppContactsByOtherAppResponse {
  Infos: ReadonlyArray<AppContact>
}

interface CreateAppContactRequest {
  Info: AppContact
  Message: ReqMessage
}

interface CreateAppContactResponse {
  Info: AppContact
}

interface UpdateAppContactRequest {
  Info: AppContact
  Message: ReqMessage
}

interface UpdateAppContactResponse {
  Info: AppContact
}

export {
  AppContact,
  GetAppContactsByAppRequest,
  GetAppContactsByAppResponse,
  GetAppContactsByOtherAppRequest,
  GetAppContactsByOtherAppResponse,
  CreateAppContactRequest,
  CreateAppContactResponse,
  UpdateAppContactRequest,
  UpdateAppContactResponse
}
