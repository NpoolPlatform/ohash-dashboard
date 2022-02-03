enum API {
  LOGIN = '/login-gateway/v1/login',
  LOGOUT = '/login-gateway/v1/logout'
}

enum LoginType {
  PHONE_NO = 'phone_no',
  EMAIL_ADDRESS = 'email_address',
  USERNAME = 'username'
}

enum GoogleTokenReq {
  Login = 'login'
}

const GoogleRecaptchaKey = '6Lcg4yIeAAAAANIyLz_mbENlYRSkK1C_aQkejb_4'

export {
  API,
  LoginType,
  GoogleRecaptchaKey,
  GoogleTokenReq
}
