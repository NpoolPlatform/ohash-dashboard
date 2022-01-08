enum API {
  LOGIN = '/login-door/v1/login',
  LOGOUT = '/login-door/v1/logout'
}

enum LoginType {
  PHONE_NO = 'phone_no',
  EMAIL_ADDRESS = 'email_address',
  USERNAME = 'username'
}

export {
  API,
  LoginType
}
