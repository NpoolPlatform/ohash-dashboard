import { Notification } from './types'

interface NotificationState {
  Notifications: Map<string, Array<Notification>>
}

function state (): NotificationState {
  return {
    Notifications: {} as Map<string, Array<Notification>>
  }
}

export { state, NotificationState }
