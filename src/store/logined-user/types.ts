import { LoginType } from './const'

interface LoginRequest {
  Username: string
  Password: string
  LoginType: LoginType
}

interface UserInfo {
  UserID: string
  Username: string
}

interface LoginResponse {
  Info: UserInfo
}

export {
  LoginRequest,
  LoginResponse,
  UserInfo
}
