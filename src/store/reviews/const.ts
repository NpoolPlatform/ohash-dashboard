enum API {
  GET_KYC_REVIEWS = '/cloud-hashing-apis-v2/v1/get/kyc/reviews',
  UPDATE_REVIEW = '/review-service/v1/update/review',
  GET_WITHDRAW_ADDRESS_REVIEWS = '/cloud-hashing-apis-v2/v1/get/withdraw/address/reviews',
  GET_WITHDRAW_REVIEWS = '/cloud-hashing-apis-v2/v1/get/withdraw/reviews',
  UPDATE_USER_WITHDRAW_REVIEW = '/cloud-hashing-apis-v2/v1/update/user/withdraw/review'
}

enum State {
  Approved = 'approved',
  Rejected = 'rejected'
}

export {
  API,
  State
}
