import { ReqMessage } from '../notifications/types'

interface Announcement {
  ID: string
  Title: string
  Content: string
  CreateAt: number
}

interface CreateAnnouncementRequest {
  Info: Announcement
  Message: ReqMessage
}

interface CreateAnnouncementResponse {
  Info: Announcement
}

interface UpdateAnnouncementRequest {
  Info: Announcement
  Message: ReqMessage
}

interface UpdateAnnouncementResponse {
  Info: Announcement
}

interface GetAnnouncementsRequest {
  Message: ReqMessage
}

interface GetAnnouncementsResponse {
  Infos: Array<Announcement>
}

interface Mail {
  ID: string
  FromUserID: string
  ToUserID: string
  Title: string
  Content: string
  AlreadyRead: string
  CreateAt: number
}

export {
  Announcement,
  CreateAnnouncementRequest,
  CreateAnnouncementResponse,
  GetAnnouncementsRequest,
  GetAnnouncementsResponse,
  UpdateAnnouncementRequest,
  UpdateAnnouncementResponse,
  Mail
}
