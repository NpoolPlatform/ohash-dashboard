enum API {
  LOGIN = '/login-door/v1/login',
  LOGOUT = '/login-door/v1/logout'
}

enum LoginType {
  PHONE_NO = 'phone_no',
  EMAIL_ADDRESS = 'email_address',
  USERNAME = 'username'
}

const GoogleRecaptchaKey = '6Lcg4yIeAAAAANIyLz_mbENlYRSkK1C_aQkejb_4'

export {
  API,
  LoginType,
  GoogleRecaptchaKey
}
