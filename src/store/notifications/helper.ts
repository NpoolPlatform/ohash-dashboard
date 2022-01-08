import { Message, Notification, PopNotification } from './types'
import { ModuleKey } from './const'
import { v4 as uuidv4 } from 'uuid'

const notificationPush = (key: ModuleKey, message: Message): Notification => {
  return {
    ModuleKey: key,
    ID: uuidv4(),
    Message: message
  }
}

const notificationPop = (notification: Notification): PopNotification => {
  return {
    ModuleKey: notification.ModuleKey,
    ID: notification.ID
  }
}

export {
  notificationPush,
  notificationPop
}
