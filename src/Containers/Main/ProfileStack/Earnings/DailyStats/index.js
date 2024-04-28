import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@/Hooks';
import DailyDetails from './Components/DailyDetails';
import { APIRequest } from '@/Services/ApiRequest';
import { useSelector } from 'react-redux';
import { VeroLoader } from '@/Components';

const DailyStats = () => {
  const user_id = useSelector(state => state.user.user._id)
  const [totalStats, setTotalStats] = useState()
  const [dailyStats, setDailyStats] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    getStats()
  }, [])

  const getStats = () =>{
      setLoading(true)
      new APIRequest.Builder()
        .get()
        .reqURL(`driver/${user_id}/stats?todaysOnly=true`)
        .jsonParams()
        .response(response => {
          console.log("Response ", response),
          setTotalStats(response?.data?.data?.totalStats)
          setDailyStats(response?.data?.data?.dailyStats)
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
  const { Layout } = useTheme()
  return (
  <View style={Layout.fill}>
     <DailyDetails
        totalStats = {totalStats}
        dailyStats = {dailyStats}
     />
     {loading && <VeroLoader/>}
  </View>);
}

export default DailyStats;