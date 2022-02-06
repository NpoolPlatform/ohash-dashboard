enum API {
  LOGIN = '/login-gateway/v1/login',
  LOGOUT = '/login-gateway/v1/logout',
  GET_APP_USER_INFOS_BY_OTHER_APP = '/appuser-manager/v1/get/app/userinfos/by/other/app',
  GET_APP_ROLE_USERS_BY_OTHER_APP = '/appuser-manager/v1/get/app/role/users/by/other/app',
  CREATE_APP_ROLE_USER_FOR_OTHER_APP = '/appuser-manager/v1/create/app/role/user/for/other/app'
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
