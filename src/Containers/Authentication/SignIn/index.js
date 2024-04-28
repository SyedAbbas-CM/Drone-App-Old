import React, { useState } from 'react';
import { View } from 'react-native';
import {VeroBackButton, 
    VeroHeaderText, 
    VeroButton, 
    VeroTextInput,
    VeroUnderLineText
    } from '@/Components'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/Hooks'
import { navigate } from '@/Navigators/utils';
import { userAuth } from '@/Store/Actions/user'
import { APIRequest } from '@/Services/ApiRequest'
import { Config } from '@/Config'
import messaging from '@react-native-firebase/messaging';
import { VeroLoader } from '@/Components';
import { showSnackBar } from '@/Services/Helpers';


const SignIn = (props) => {
    console.log("Props here are", props)
    const { Layout, Colors, Fonts, Images } = useTheme()
    const { t } = useTranslation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()

    const submit = () => {
        let params = {
            email: email,
            password: password,
          }
          setLoading(true)
          new APIRequest.Builder()
            .post()
            .reqURL(Config.END_POINTS.LOGIN)
            .jsonParams(params)
            .response(response => {
              console.log("Response ", response),
              dispatch(userAuth(response?.data?.data))
              messaging().subscribeToTopic('driver-new-purchase-'+response?.data?.data?._id);            
              messaging().subscribeToTopic('ride-cancelled-'+response?.data?.data?._id);            
              messaging().subscribeToTopic('ride-purchase-acknowledged-'+response?.data?.data?._id);            
              messaging().subscribeToTopic('ride-purchase-cancelled-'+response?.data?.data?._id); 
              props?.navigation?.replace("Main")
              setLoading(false)
             })
            .error(error => {
              console.log('Showing error', error),
              showSnackBar(Config.SnackBarEnum.ERROR, error?.meta?.message ?? "Something went wrong! we are fixing it.")
              setLoading(false)
            })
            .build()
            .doRequest()
    }


  return (
      <View style={Layout.mobileInputContainer}>
      <VeroBackButton/>
      <VeroHeaderText
          title={t('signinSmall')}
      />
      <VeroTextInput
            placeholder={t('email')}
            value={email}
            autoCapitalize={'none'}
            keyboardType="email-address"
            onChangeText={text => setEmail(text)}
      />
      <VeroTextInput
            placeholder={t('password')}
            value={password}
            secureTextEntry
            onChangeText={text => setPassword(text)}
      />
      <VeroButton
          title={t("signin")}
          isDisabled={false}
          onPress={submit}
      />
      <VeroUnderLineText
          title={t("forgot")}
          onPress={()=> navigate("ForgotPassword")}
          // onPress={()=> navigate("Main")}
      />
      {loading && <VeroLoader/>}
      </View>
  )
}

export default SignIn;