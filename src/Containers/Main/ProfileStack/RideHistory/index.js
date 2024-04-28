import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@/Hooks'
import { useTranslation } from 'react-i18next'
import { VeroHeader } from '@/Components';
import { Colors } from '@/Theme/Variables';
import { WP } from '@/Theme/Responsive';
import { navigate } from '@/Navigators/utils';
import { APIRequest } from '@/Services/ApiRequest'
import { Config } from '@/Config'
import { VeroLoader } from '@/Components';
import ItemsList from './Components/List';

const RideHistory = (props) => {
    let newArray = new Array()
  const { t } = useTranslation()
  const { Layout } =useTheme()
  const [loading, setLoading] = useState(false)
  const [ridesData, setRidesData] = useState()

  useEffect(()=>{
    getRides()
  }, [])

  const getRides = ()=>{
    setLoading(true)
      new APIRequest.Builder()
      .get()
      .reqURL(Config.END_POINTS.RIDES)
      .jsonParams()
      .response(response => {
        console.log("Response ", response),
        response?.data?.data?.map((item)=>{
            newArray.push(item.purchase)
        })
        setRidesData(newArray)
        setLoading(false)
       })
      .error(error => {
        console.log('Showing error', error),
        setLoading(false)
      })
      .build()
      .doRequest()
  }
  const rideStatus = (item) =>{
      // if(item.status == 'ride_accepted'){
      //   navigate("RideScreen")
      // } else if (item.status == 'ride_started'){
      //   navigate("RideToDestination")
      // } else {
        navigate("RideDetails", item)
      // }
  }
  return (
  <View style={Layout.fill}>
    <VeroHeader title={t("rideHistory")}/>
    <ItemsList data={ridesData} onPressItem={(item)=>rideStatus(item)}/>
    {loading && <VeroLoader/>}
  </View>
     
);
}

export default RideHistory;