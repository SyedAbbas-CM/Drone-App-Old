import React, { useState } from 'react';
import { View } from 'react-native';
import {VeroBackButton, 
    VeroHeaderText, 
    VeroButton, 
    VeroTextInput,
    VeroUnderLineText, 
    VeroSubHeaderText
    } from '@/Components'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/Hooks'
import { APIRequest } from '@/Services/ApiRequest'
import { Config } from '@/Config'
import { goBack } from '@/Navigators/utils';
import { VeroLoader } from '@/Components';
import { showSnackBar } from '@/Services/Helpers';


const ForgotPassword = (props) => {
    console.log("Props here are", props)
    const { Layout, Colors, Fonts, Images } = useTheme()
    const { t } = useTranslation()
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState()


    const submit = () => {
        let params = {
            email: email,
          }
          setLoading(true)
          new APIRequest.Builder()
            .post()
            .reqURL(Config.END_POINTS.FORGOT)
            .jsonParams(params)
            .response(response => {
              console.log("Response ", response);
              showSnackBar(Config.SnackBarEnum.SUCCESS, "Please check your email for new password")
              setLoading(false)
              goBack()
            })
            .error(error => {
              console.log('Showing error', error)
              setLoading(false)
            })
            .build()
            .doRequest()
    }


  return (
      <View style={Layout.mobileInputContainer}>
      <VeroBackButton/>
      <VeroHeaderText
          title={t('forgotPass')}
      />
      <VeroSubHeaderText
          title={t('forgotSubText')}
      />
      <VeroTextInput
            placeholder={t('email')}
            value={email}
            autoCapitalize={'none'}
            keyboardType="email-address"
            onChangeText={text => setEmail(text)}
      />
      <VeroButton
          title={t("submit")}
          isDisabled={false}
          onPress={submit}
      />
        {loading && <VeroLoader/>}
      </View>
  )
}

export default ForgotPassword;