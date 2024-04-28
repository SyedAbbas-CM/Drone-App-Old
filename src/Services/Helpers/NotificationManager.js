import PushNotification from 'react-native-push-notification'
import PushNotificationIOS from '@react-native-community/push-notification-ios'
import { Platform } from 'react-native'

class NotificationManager {
    configure = (onRegister, onNotification, onOpenNotification)=>{
        PushNotification.configure({
            onRegister: function (token) {
                onRegister(token)
                console.log("[NotificationManager] onRegister TOKEN:", token);
            },

            onNotification: function (notification) {
                console.log("[NotificationManager] onNOTIFICATION:", notification);

                if(Platform.OS === 'ios'){
                    if(notification.data.openedInForeground){
                        notification.userInteraction = true
                    }
                } else {
                    notification.userInteraction = true
                }

                if (notification.userInteraction){
                    onOpenNotification(notification)
                } else {
                    onNotification(notification)
                }
            
                // process the notification
            
                // (required) Called when a remote is received or opened, or local notification is opened
                // notification.finish(PushNotificationIOS.FetchResult.NoData);
                if (Platform.OS === 'ios'){
                    if(!notification.data.openedInForeground){
                        notification.finish('backgroundFetchResultNoData')
                    }
                } else {
                    notification.finish('backgroundFetchResultNoData')
                }
              },

        })
    }

    buildAndroidNotification = (id, title, message, data ={}, options = {}) =>{
        return {
            id: id,
            autoCancel: true,
            largeIcon: options.largeIcon || "ic_launcher",
            smallIcon: options.smallIcon || "ic_launcher",
            bigText: message || '',
            subText: title || '',
            vibrate: options.vibrate || false,
            vibration: options.vibration || 300,
            priority: options.priority || "high",
            importance: options.importance || "high",
            data: data
        }
    }
    buildIOSNotification = (id, title, message, data ={}, options = {}) =>{
        return {
            alertAction: options.alertAction || "view",
            category: options.category || "",
            userInfo: {
                id: id,
                item: data
            }
        }
    }
    showNotification = (id, title, message, data={}, options={}) =>{
        PushNotification.localNotification({
            //android only properties
            ...this.buildAndroidNotification(id, title, message, data, options),
            //iOS only properties
            ...this.buildIOSNotification(id, title, message, data, options),
            //android and iOS properties
            title: title || "",
            message: message || "",
            playSound: options.playSound || true,
            soundName: options.soundName || 'default',
            userInteration: false
        })
    }

    cancelAllLocalNotification = () =>{
        if(Platform.OS == 'ios') {
            PushNotificationIOS.removeAllDeliveredNotifications()
        } else {
            PushNotification.cancelAllLocalNotifications()
        }
    }

    unregister = ()=>{
        PushNotification.unregister()
    }
}

export const notificationManager = new NotificationManager()