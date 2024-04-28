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

const EditBankDetails = (props) => {
  console.log("props in edit bank", props);
  
    const user = useSelector(state => state.user.user)
    const user_id = useSelector(state => state.user.user._id)    
    const { t } = useTranslation()
    const [loading, setLoading] = useState(false)
    const { Layout } = useTheme()
    const dispatch = useDispatch()
    const [bankName, setBankName] = useState('')
    const [holderName, setHolderName] = useState('')
    const [accountNumber, setAccountNumber] = useState('')
    const [swiftCode, setSwiftCode] = useState('')
    const { params } = props?.route


    useEffect(()=>{
        const { params } = props?.route
        if(params?.isEdit == true){
          const { bank_name, account_holder, account_number, swift_ifsc_code } = params?.data
          setBankName(bank_name && bank_name),
          setHolderName(account_holder && account_holder),
          setAccountNumber(account_number && account_number)
          setSwiftCode(swift_ifsc_code && swift_ifsc_code)
        }
        // getBankDetails()
      },[])

      const getBankDetails = () =>{
        setLoading(true)
        new APIRequest.Builder()
          .get()
          .reqURL(`users/${user_id}/bank-details`)
          .jsonParams()
          .response(response => {
            console.log("Response ", response)
            // dispatch(userAuth(response?.data?.data))
            // showSnackBar(Config.SnackBarEnum.SUCCESS, "Profile updated successfully!")
            setLoading(false)
           })
          .error(error => {
            console.log('Showing error', error)
            // showSnackBar(Config.SnackBarEnum.ERROR, error?.meta?.message ?? "Something went wrong! we are fixing it.")
            setLoading(false)
          })
          .build()
          .doRequest()
    }


    const submit = () =>{
        let params = {
          bank_name: bankName,
          account_number: accountNumber,
          account_holder: holderName,
          swift_ifsc_code: swiftCode,
          }
          setLoading(true)
          new APIRequest.Builder()
            .post()
            .reqURL(`${Config.END_POINTS.USERS}/${user_id}/bank-details`)
            .jsonParams(params)
            .response(response => {
              console.log("Response ", response),
              props.navigation.pop(2),
              // dispatch(userAuth(response?.data?.data))
              showSnackBar(Config.SnackBarEnum.SUCCESS, "Bank Details updated successfully!")
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
        <VeroHeader title={t("bankdetails")}/>
        <View style={{backgroundColor: Colors.white, marginTop: WP('1'), flex: 1}}>
        <VeroTextInput
            placeholder={t('bankName')}
            value={bankName}
            onChangeText={text => setBankName(text)}
        />
        <VeroTextInput
            placeholder={t('holderName')}
            value={holderName}
            onChangeText={text => setHolderName(text)}
        />
        <VeroTextInput
            placeholder={t('accountNumber')}
            value={accountNumber}
            keyboardType="numeric"
            onChangeText={text => setAccountNumber(text)}
        />
        <VeroTextInput
            placeholder={t('swiftCode')}
            value={swiftCode}
            keyboardType="numeric"
            onChangeText={text => setSwiftCode(text)}
        />
        <VeroButton
            title={t("submit")}
            onPress={submit}
        />

        </View>
        {loading && <VeroLoader/>}
      </View>
  );
}

export default EditBankDetails;