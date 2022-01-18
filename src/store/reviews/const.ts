enum API {
  GET_KYC_REVIEWS = '/cloud-hashing-apis-v2/v1/get/kyc/reviews',
  GET_GOOD_REVIEWS = '/cloud-hashing-apis-v2/v1/get/good/reviews'
}

enum State {
  Approved = 'approved',
  Rejected = 'rejected'
}

export {
  API,
  State
}
