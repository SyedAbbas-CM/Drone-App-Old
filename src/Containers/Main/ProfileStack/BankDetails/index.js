import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import {useTheme} from '@/Hooks'
import { useTranslation } from 'react-i18next'
import { VeroHeader } from '@/Components';
import { useSelector, useDispatch } from 'react-redux';
import { APIRequest } from '@/Services/ApiRequest';
import { Config } from '@/Config';
import { VeroLoader } from '@/Components';
import { userAuth } from '@/Store/Actions';
import { showSnackBar } from '@/Services/Helpers';
import BankInfo from './Components/BankInfo';
import { navigate } from '@/Navigators/utils';

const BankDetails = () => {
    const user_id = useSelector(state => state.user.user._id)    
    const { t } = useTranslation()
    const [loading, setLoading] = useState(false)
    const { Layout } = useTheme()
    const dispatch = useDispatch()
    const [bankDetails, setBankDetails] = useState()


    useEffect(()=>{
        getBankDetails()
      },[])

      const getBankDetails = () =>{
        setLoading(true)
        new APIRequest.Builder()
          .get()
          .reqURL(`users/${user_id}/bank-details`)
          .jsonParams()
          .response(response => {
            console.log("Response ", response)
              setBankDetails(response?.data?.data)
            setLoading(false)
           })
          .error(error => {
            console.log('Showing error', error)
            if(error?.code == 400){
              navigate("EditBankDetails")
            }
            setLoading(false)
          })
          .build()
          .doRequest()
    }


    const deleteBankDetails = () =>{
          setLoading(true)
          new APIRequest.Builder()
            .delete()
            .reqURL(`${Config.END_POINTS.USERS}/${user_id}/bank-details`)
            .jsonParams()
            .response(response => {
              showSnackBar(Config.SnackBarEnum.SUCCESS, "Bank Details deleted successfully!")
              setLoading(false)
              setBankDetails(null)
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
        {bankDetails &&
        <BankInfo
          data={bankDetails}
          onPressEdit={()=>navigate("EditBankDetails", {isEdit: true, data: bankDetails})}
          onPressDelete={deleteBankDetails}
        />
        }
        {loading && <VeroLoader/>}
      </View>
  );
}

export default BankDetails;