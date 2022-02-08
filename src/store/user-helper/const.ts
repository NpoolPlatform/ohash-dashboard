enum API {
  LOGIN = '/login-gateway/v1/login',
  LOGOUT = '/login-gateway/v1/logout',
  GET_APP_USER_INFOS = '/appuser-manager/v1/get/app/userinfos/by/app',
  GET_APP_ROLE_USERS = '/appuser-manager/v1/get/app/role/users/by/app',
  CREATE_APP_ROLE_USER_FOR_APP_OTHER_USER = '/appuser-manager/v1/create/app/role/user/for/app/other/user',
  DELETE_APP_ROLE_USER = '/appuser-manager/v1/delete/app/role/user'
}

enum LoginType {
  PHONE_NO = 'mobile',
  EMAIL_ADDRESS = 'email'
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
