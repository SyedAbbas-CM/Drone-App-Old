import React, { useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import MapScreen from '@/Containers/Main/MapScreen'
import RideScreen from '../Containers/Main/RideScreen'
import TripNotification from '../Containers/Main/TripNotification'
import RideToDestination from '../Containers/Main/RideToDestination'
import ProfileStack from '../Containers/Main/ProfileStack'
import RideToPickup from '../Containers/Main/RideToPickup'
import ChatScreen from '../Containers/Main/ChatScreen'
import { useDispatch, useSelector } from 'react-redux'
import { Config } from '../Config'


const Stack = createStackNavigator()

// @refresh reset
const MainNavigator = (props) => {
  const user = useSelector(state => state.user.user)
  const appState = useSelector(state => state.user.appState)
  useEffect(() => {
    console.log("User here in startup", user)
    console.log("App state in startup", appState)
    if (user) {
      if(appState){
        if(appState == Config.AppStateEnum.RIDE_ACCEPTED){
          props.navigation?.navigate("RideScreen")
        } else if(appState == Config.AppStateEnum.RIDE_STARTED) {
          props.navigation?.navigate("RideToDestination")
        } else if(appState == Config.AppStateEnum.RIDE_ARRIVED) {
          props.navigation?.navigate("RideToPickup")
        } 
        // else if(appState == Config.AppStateEnum.RIDE_ENDED) {
        //   props.navigation?.replace('MapScreen')
        // }
      } 
      // else {
      // props.navigation.replace('MapScreen')
      // }
    }
  }, [])


  return (
    <Stack.Navigator headerMode={'none'}>
      <Stack.Screen name="MapScreen" component={MapScreen} />
      <Stack.Screen name="RideScreen" component={RideScreen} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="RideToDestination" component={RideToDestination} />
      <Stack.Screen name="RideToPickup" component={RideToPickup} />
      <Stack.Screen name="ProfileStack" component={ProfileStack} />
      <Stack.Screen name="TripNotification" component={TripNotification} />

    </Stack.Navigator>
  )
}

export default MainNavigator
