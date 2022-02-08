enum API {
  GET_APPLICATIONS = '/appuser-manager/v1/get/appinfos',
  CREATE_APPLICATION = '/appuser-manager/v1/create/app',
  UPDATE_APPLICATION = '/appuser-manager/v1/update/app',
  UPDATE_APP_CONTROL = '/appuser-manager/v1/update/app/control',
  CREATE_APP_CONTROL = '/appuser-manager/v1/create/app/control',
  GET_APP_ROLES_BY_OTHER_APP = '/appuser-manager/v1/get/app/roles/by/other/app',
  CREATE_APP_ROLE_FOR_OTHER_APP = '/appuser-manager/v1/create/app/role/for/other/app',
  UPDATE_APP_ROLE = '/appuser-manager/v1/update/app/role'
}

export {
  API
}
