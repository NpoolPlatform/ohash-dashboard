import { ReqMessage } from '../notifications/types'

interface Application {
  ID: string
  ApplicationName: string
  ApplicationOwner: string
  ApplicationLogo: string
  HomepageUrl: string
  CreateAt: number
  SmsLogin: boolean
  InvitationCodeMust: boolean
}

interface GetApplicationsResponse {
  Infos: ReadonlyArray<Application>
}

interface GetApplicationsRequest {
  Message: ReqMessage
}

export {
  Application,
  GetApplicationsRequest,
  GetApplicationsResponse
}
