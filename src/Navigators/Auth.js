import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import StartupContainer from '../Containers/Startup/StartupContainer'
import SignIn from '@/Containers/Authentication/SignIn'
import ForgotPassword from '@/Containers/Authentication/ForgotPassword'

const Stack = createStackNavigator()

// @refresh reset
const AuthStack = () => {
    return (
      <Stack.Navigator headerMode={'none'}>
        <Stack.Screen name="Startup" component={StartupContainer} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />

      </Stack.Navigator>
    )
  }
  

export default AuthStack
