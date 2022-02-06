enum API {
  GET_APPLICATIONS = '/appuser-manager/v1/get/appinfos',
  CREATE_APPLICATION = '/appuser-manager/v1/create/app',
  UPDATE_APPLICATION = '/appuser-manager/v1/update/app',
  UPDATE_APP_CONTROL = '/appuser-manager/v1/update/app/control',
  CREATE_APP_CONTROL = '/appuser-manager/v1/create/app/control',
  GET_AUTH_HISTORIES_BY_OTHER_APP = '/authing-gateway/v1/get/auth/histories/by/other/app'
}

export {
  API
}
