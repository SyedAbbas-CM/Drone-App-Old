import React, {useEffect} from 'react'
import { Alert, SafeAreaView, StatusBar } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { useTheme } from '@/Hooks'
import MainNavigator from './Main'
import { navigationRef } from './utils'
import AuthStack from './Auth'
import messaging from '@react-native-firebase/messaging';
import { setPurchaseID } from '@/Store/Actions/user'
import { useDispatch, useSelector } from 'react-redux'
import { notificationManager } from '../Services/Helpers/NotificationManager'


const Stack = createStackNavigator()

// @refresh reset

const ApplicationNavigator = (props) => {
  const user = useSelector(state => state.user.user)

  let localNotify = null
  const dispatch = useDispatch()

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission()
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL

  if (enabled) {
    console.log('Authorization status:', authStatus)
  }
}

const checkToken = async () => {
  const fcmToken = await messaging().getToken();
  if (fcmToken) {
    console.log("FCM Token", fcmToken);
  }
  else {
    console.log("FCM Token Not generated");
  }
}

useEffect(()=>{
  localNotify = notificationManager
  localNotify.configure(onRegister, onNotification, onOpenNotification)
  console.log("value of naviagtio ref", navigationRef)
}, [])

const onRegister = (token)=>{
 console.log("[Notification] Registered", token)
}

const onNotification = (notify)=>{
  console.log("[Notification] onNotification", notify)
}

const onOpenNotification = (notify)=>{
  console.log("[Notification] onOpenNotification", notify)
  if(notify?.data?.item){
    dispatch(setPurchaseID(notify?.data?.item?.purchase_id))
    console.log('props.naviation', props)
    navigationRef?.navigate("TripNotification")
  } else {
    dispatch(setPurchaseID(notify?.data?.purchase_id))
    navigationRef?.navigate("TripNotification")

  }
}

useEffect(() => {
  checkToken()
  requestUserPermission()
  const unsubscribe = messaging().onMessage(async remoteMessage => {
    localNotify.showNotification(
      1,
      remoteMessage?.notification?.title,
      remoteMessage?.notification?.body,
      remoteMessage?.data, // data
      {}, // options
    )
    console.log('A new FCM message arrived!', remoteMessage)
  })

  // Assume a message-notification contains a "type" property in the data payload of the screen to open

  // messaging().onNotificationOpenedApp(remoteMessage => {
  //   console.log(
  //     'Notification caused app to open from background state:',
  //     remoteMessage,
  //   )
  //   // this.props.navigator.push({
  //   //   screen: 'newtrainingscreen',
  //   //   title: notification.data.title,
  //   //   animated: true
  //   // });
  //   dispatch(setPurchaseID(remoteMessage?.data?.purchase_id))
  //   // navigation.navigate("TripNotification");
  // })

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        )
        setInitialRoute(remoteMessage.data.type) // e.g. "Settings"
      }
    })
  return unsubscribe
}, [])

  const { Layout, darkMode, NavigationTheme } = useTheme()
  const { colors } = NavigationTheme

  return (
    <SafeAreaView style={[Layout.fill, { backgroundColor: colors.card }]}>
      <NavigationContainer theme={NavigationTheme} ref={navigationRef}>
        <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? 
          <Stack.Screen
            name="Main"
            component={MainNavigator}
            options={{
              animationEnabled: false,
            }}
          />
          : 
          <Stack.Screen name="Auth" component={AuthStack} />
          }
          {/* <Stack.Screen name="Auth" component={AuthStack} />
          <Stack.Screen
            name="Main"
            component={MainNavigator}
            options={{
              animationEnabled: false,
            }}
          /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  )
}

export default ApplicationNavigator
