import { ReqMessage } from '../notifications/types'
import { ImageType } from './const'

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
  UserHandingCardImg: string
  CreateAt: number
}

interface GetKYCsResponse {
  Infos: ReadonlyArray<KYC>
}

interface GetKYCsRequest {
  AppID: string
  Message: ReqMessage
}

interface KYCImage {
  KYCID?: string
  ImageType?: ImageType
  URI?: string
  Base64?: string
}

interface GetKYCImageRequest extends KYCImage {
  ImageS3Key?: string
  Message: ReqMessage
}

interface GetKYCImageResponse {
  Info: string
}

export {
  KYC,
  GetKYCsRequest,
  GetKYCsResponse,
  KYCImage,
  GetKYCImageRequest,
  GetKYCImageResponse
}
