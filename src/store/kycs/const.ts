enum API {
  GET_KYCS = '/kyc-management/v1/get/all/kyc',
  GET_KYC_IMAGE = '/kyc-management/v1/get/kyc/image'
}

enum ImageType {
  Front = 'Front',
  Back = 'Back',
  Handing = 'Handing'
}

export {
  API,
  ImageType
}
