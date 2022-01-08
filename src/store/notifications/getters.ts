import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { NotificationState } from './state'
import { Notification } from './types'

type NotificationGetters = {
  peekNotification (state: NotificationState, key: string): Notification | undefined
}

const getters: GetterTree<NotificationState, RootState> & NotificationGetters = {
  peekNotification: (state: NotificationState, key: string): Notification | undefined => {
    let notification: Notification | undefined
    const notifications = state.Notifications.get(key)
    if (notifications && notifications.length > 0) {
      notification = notifications.pop()
    }
    state.Notifications.set(key, notifications as Array<Notification>)
    return notification
  }
}

export { NotificationGetters, getters }
