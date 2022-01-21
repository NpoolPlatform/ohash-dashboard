import { ReqMessage } from '../notifications/types'

interface API {
  ID: string
  ServiceName: string
  Domains: Array<string>
  Method: string
  Path: string
  Exported: boolean
  PathPrefix: string
  Protocol: string
  CreateAt: number
  UpdateAt: number
}

interface GetAPIsResponse {
  Infos: ReadonlyArray<API>
}

interface GetAPIsRequest {
  Message: ReqMessage
}

export {
  API,
  GetAPIsRequest,
  GetAPIsResponse
}
