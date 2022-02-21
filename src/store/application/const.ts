enum API {
  GET_APPLICATION = '/appuser-manager/v1/get/appinfo',
  CREATE_APPLICATION = '/appuser-manager/v1/create/app',
  UPDATE_APPLICATION = '/appuser-manager/v1/update/app',
  UPDATE_APP_CONTROL = '/appuser-manager/v1/update/app/control',
  CREATE_APP_CONTROL = '/appuser-manager/v1/create/app/control',
  GET_APP_ROLES = '/appuser-manager/v1/get/app/roles/by/app',
  UPDATE_APP_ROLE = '/appuser-manager/v1/update/app/role',
  CREATE_APP_ROLE = '/appuser-manager/v1/create/app/rile',
  GET_APP_GOODS = '/cloud-hashing-goods/v1/get/app/goods',
  GET_RECOMMENDS = '/cloud-hashing-goods/v1/get/recommends/by/app',
  CREATE_RECOMMEND = '/cloud-hashing-goods/v1/create/recommend',
  SET_APP_GOOD_PRICE = '/cloud-hashing-goods/v1/set/app/good/price',
  ONSALE_APP_GOOD = '/cloud-hashing-goods/v1/onsale/app/good',
  OFFSALE_APP_GOOD = '/cloud-hashing-goods/v1/offsale/app/good',
  GET_APP_WITHDRAW_SETTINGS = '/cloud-hashing-billing/v1/get/app/withdraw/settings',
  CREATE_APP_WITHDRAW_SETTING = '/cloud-hashing-billing/v1/create/app/withdraw/setting',
  UPDATE_APP_WITHDRAW_SETTING = '/cloud-hashing-billing/v1/update/app/withdraw/setting'
}

export {
  API
}
