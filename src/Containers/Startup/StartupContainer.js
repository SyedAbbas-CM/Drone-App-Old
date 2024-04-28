import React, { useEffect } from 'react'
import { ActivityIndicator, View, Text, ImageBackground } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/Hooks'
import { Brand, VeroButton } from '@/Components'
import { navigate, navigationRef } from '@/Navigators/utils'
import { useDispatch, useSelector } from 'react-redux'
import { Config } from '@/Config'

const StartupContainer = (props) => {
  const user = useSelector(state => state.user.user)
  const appState = useSelector(state => state.user.appState)
  const { Layout, Gutters, Fonts, Images } = useTheme()
  const { t } = useTranslation()
  const pressSignIn = ()=>navigate("SignIn")
  const pressSignUp = ()=>alert("sign up pressed")
  const dispatch = useDispatch()

  useEffect(() => {
    console.log("User here in startup", user)
    console.log("App state in startup", appState)
    if (user) {
      // if(appState){
      //   if(appState == Config.AppStateEnum.RIDE_ACCEPTED){
      //     props.navigation?.navigate("RideScreen")
      //   } else if(appState == Config.AppStateEnum.RIDE_STARTED) {
      //     props.navigation?.navigate("RideToDestination")
      //   } else if(appState == Config.AppStateEnum.RIDE_ARRIVED) {
      //     props.navigation?.navigate("RideToPickup")
      //   } else if(appState == Config.AppStateEnum.RIDE_ENDED) {
      //     props.navigation?.replace('Main')
      //   }
      // } else {
      props.navigation.replace('Main')
      // }
    } // dispatch(InitStartup.action())
  }, [dispatch])
     
  



  return (
    <ImageBackground style={[Layout.fill,]}
      source={Images.appBackground}>
      <View style={Layout.innerContainer}>
      <Brand />
      <VeroButton 
      mode="contained"
      onPress={pressSignIn}
      title={t('signin')}
      />
      {/* <VeroButton 
      mode="outlined"
      onPress={pressSignUp}
      title={t('signup')}
      /> */}
      </View>
    </ImageBackground>
  )
}

export default StartupContainer
