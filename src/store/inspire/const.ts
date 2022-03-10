enum API {
  GET_USER_INVITATION_CODES = '/cloud-hashing-inspire/v1/get/user/invitation/codes/by/app',
  CREATE_USER_INVITATION_CODE_FOR_APP_OTHER_USER = '/cloud-hashing-inspire/v1/create/user/invitation/code/for/app/other/user',

  CREATE_APP_COMMISSION_SETTING = '/cloud-hashing-inspire/v1/create/app/commission/setting',
  UPDATE_APP_COMMISSION_SETTING = '/cloud-hashing-inspire/v1/update/app/commission/setting',
  GET_APP_COMMISSION_SETTING = '/cloud-hashing-inspire/v1/get/app/commission/setting/by/app',

  CREATE_APP_PURCHASE_AMOUNT_SETTING = '/cloud-hashing-inspire/v1/create/app/purchase/amount/setting',
  GET_APP_PURCHASE_AMOUNT_SETTINGS = '/cloud-hashing-inspire/v1/get/app/purchase/amount/settings/by/app',

  CREATE_APP_USER_PURCHASE_AMOUNT_SETTING_FOR_APP_OTHER_USER = '/cloud-hashing-inspire/v1/create/app/user/purchase/amount/setting/for/app/other/user',
  GET_APP_USER_PURCHASE_AMOUNT_SETTINGS_BY_APP_OTHER_USER = '/cloud-hashing-inspire/v1/get/app/user/purchase/amount/settings/by/app/other/user',

  GET_COMMISSION_COINS_SETTINGS = '/cloud-hashing-inspire/v1/get/commission/coin/settings'
}

export {
  API
}
