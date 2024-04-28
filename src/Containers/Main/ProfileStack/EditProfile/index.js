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

const EditProfile = () => {
    const user = useSelector(state => state.user.user)
    const { t } = useTranslation()
    const [loading, setLoading] = useState(false)
    const { Layout } = useTheme()
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')

    useEffect(()=>{
        const {mobile_number, email, street_address} = user
        setPhone(mobile_number),
        setEmail(email),
        setAddress(street_address)
      },[])

    const submit = () =>{
        let params = {
            mobile_number: phone,
            street_address: address
          }
          setLoading(true)
          new APIRequest.Builder()
            .put()
            .reqURL(Config.END_POINTS.USERS)
            .jsonParams(params)
            .response(response => {
              console.log("Response ", response),
              dispatch(userAuth(response?.data?.data))
              showSnackBar(Config.SnackBarEnum.SUCCESS, "Profile updated successfully!")
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
        <VeroHeader title={t("editProfile")}/>
        <View style={{backgroundColor: Colors.white, marginTop: WP('1'), flex: 1}}>
        <VeroTextInput
            placeholder={t('phone')}
            value={phone}
            keyboardType="numeric"
            onChangeText={text => setPhone(text)}
        />
        <VeroTextInput
            placeholder={t('email')}
            value={email}
            editable={false}
            onChangeText={text => setEmail(text)}
        />
        <VeroTextInput
            placeholder={t('address')}
            value={address}
            onChangeText={text => setAddress(text)}
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

export default EditProfile;