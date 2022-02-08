enum API {
  GET_KYC_REVIEWS = '/cloud-hashing-apis-v2/v1/get/kyc/reviews/by/app',
  GET_GOOD_REVIEWS = '/cloud-hashing-apis-v2/v1/get/good/reviews',
  UPDATE_REVIEW = '/review-service/v1/update/review'
}

enum State {
  Approved = 'approved',
  Rejected = 'rejected'
}

export {
  API,
  State
}
