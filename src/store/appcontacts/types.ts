import { ReqMessage } from '../notifications/types'

interface AppContact {
  ID?: string
  UsedFor: string
  Account: string
  AccountType: string
  Sender: string
}

interface GetAppContactsByAppRequest {
  Message: ReqMessage
}

interface GetAppContactsByAppResponse {
  Infos: ReadonlyArray<AppContact>
}

interface GetAppContactsRequest {
  Message: ReqMessage
}

interface GetAppContactsResponse {
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
  GetAppContactsRequest,
  GetAppContactsResponse,
  CreateAppContactRequest,
  CreateAppContactResponse,
  UpdateAppContactRequest,
  UpdateAppContactResponse
}
