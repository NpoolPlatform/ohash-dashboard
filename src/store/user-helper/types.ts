import { LoginType } from './const'
import { IReCaptchaComposition } from 'vue-recaptcha-v3'

interface LoginRequest {
  Username: string
  Password: string
  LoginType: LoginType
  GoogleRecaptchaResponse: string
}

interface UserInfo {
  UserID: string
  Username: string
}

interface LoginResponse {
  Info: UserInfo
}

interface GetGoogleTokenRequest {
  Recaptcha: IReCaptchaComposition | undefined
  Req: string
}

export {
  LoginRequest,
  LoginResponse,
  UserInfo,
  GetGoogleTokenRequest
}
