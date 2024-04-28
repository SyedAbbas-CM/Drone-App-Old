import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import {useTheme} from '@/Hooks'
import { useTranslation } from 'react-i18next'
import { VeroHeader } from '@/Components';
import { Colors } from '@/Theme/Variables';
import { WP } from '@/Theme/Responsive';
import { VeroTextInput, VeroButton } from '@/Components';
import { useSelector, useDispatch } from 'react-redux';
import { APIRequest } from '@/Services/ApiRequest';
import { Config } from '@/Config';
import { VeroLoader } from '@/Components';
import { userAuth } from '@/Store/Actions';
import { showSnackBar } from '@/Services/Helpers';
import { goBack } from '../../../../Navigators/utils';

const ChangePassword = () => {
    const user = useSelector(state => state.user.user)
    const { t } = useTranslation()
    const [loading, setLoading] = useState(false)
    const { Layout } = useTheme()
    const dispatch = useDispatch()
    const [password, setPassword] = useState('')
    const [confirmOldPassword, setConfirmOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const submit = () =>{
        let params = {
          currentPassword: password,
          reTypePassword: confirmOldPassword,
          newPassword: newPassword,
          }
          setLoading(true)
          new APIRequest.Builder()
            .post()
            .reqURL(Config.END_POINTS.CHANGE_PASSWORD)
            .jsonParams(params)
            .response(response => {
              console.log("Response ", response),
              showSnackBar(Config.SnackBarEnum.SUCCESS, "Password changed successfully!"),
              goBack()
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
      <View style={Layout.fill}>
        <VeroHeader title={t("changepassword")}/>
        <View style={{backgroundColor: Colors.white, marginTop: WP('1'), flex: 1}}>
        <VeroTextInput
            placeholder={t('oldPass')}
            value={password}
            secureTextEntry
            onChangeText={text => setPassword(text)}
        />
        <VeroTextInput
            placeholder={t('newPass')}
            value={confirmOldPassword}
            secureTextEntry
            onChangeText={text => setConfirmOldPassword(text)}
        />
        <VeroTextInput
            placeholder={t('confirmNewPass')}
            value={newPassword}
            secureTextEntry
            onChangeText={text => setNewPassword(text)}
        />
        <VeroButton
            title={t("save")}
            onPress={submit}
        />
        </View>
        {loading && <VeroLoader/>}
      </View>
  );
}

export default ChangePassword;