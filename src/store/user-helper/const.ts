enum API {
  LOGIN = '/login-door/v1/login',
  LOGOUT = '/login-door/v1/logout'
}

enum LoginType {
  PHONE_NO = 'phone_no',
  EMAIL_ADDRESS = 'email_address',
  USERNAME = 'username'
}

const GoogleRecaptchaKey = '6LclwaIdAAAAAKVQTwz8FYinU0rP43_m6EedDv2S'

export {
  API,
  LoginType,
  GoogleRecaptchaKey
}
