import { ReqMessage } from '../notifications/types'

interface KYC {
  ID: string
  AppID: string
  UserID: string
  FirstName: string
  LastName: string
  Region: string
  CardType: string
  CardID: string
  FrontCardImg: string
  BackCardImg: string
  UserHandlingCardImg: string
  CreateAt: number
}

interface GetKYCsResponse {
  Infos: ReadonlyArray<KYC>
}

interface GetKYCsRequest {
  AppID: string
  Message: ReqMessage
}

export {
  KYC,
  GetKYCsRequest,
  GetKYCsResponse
}
