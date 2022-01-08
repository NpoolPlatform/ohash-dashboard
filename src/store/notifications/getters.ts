import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { NotificationState } from './state'
import { Notification } from './types'
import { ModuleKey } from './const'

type NotificationGetters = {
  peekLoginNotification (state: NotificationState): Notification | undefined
}

const getters: GetterTree<NotificationState, RootState> & NotificationGetters = {
  peekLoginNotification: (state: NotificationState): Notification | undefined => {
    let notification: Notification | undefined
    const notifications = state.Notifications.get(ModuleKey.ModuleLogin)
    if (notifications && notifications.length > 0) {
      notification = notifications[0]
    }
    return notification
  }
}

export { NotificationGetters, getters }
