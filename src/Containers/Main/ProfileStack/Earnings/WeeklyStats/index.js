import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@/Hooks';
import WeeklyDetails from './Components/WeeklyDetails';
import { useSelector } from 'react-redux';
import { APIRequest } from '@/Services/ApiRequest';

const WeeklyStats = () => {
    const { Layout } = useTheme()
    const user_id = useSelector(state => state.user.user._id)
    const [totalStats, setTotalStats] = useState()
    const [weeklyStats, setWeeklyStats] = useState()

    useEffect(()=>{
        getStats()
    }, [])

    const getStats = () =>{
        // setLoading(true)
        new APIRequest.Builder()
            .get()
            .reqURL(`driver/${user_id}/stats?toDate=2022-09-28&fromDate=2022-05-23`)
            .jsonParams()
            .response(response => {
            console.log("Response ", response)
            setTotalStats(response?.data?.data?.totalStats)
            setWeeklyStats(response?.data?.data?.dailyStats)
            // dispatch(userAuth(response?.data?.data))
            // showSnackBar(Config.SnackBarEnum.SUCCESS, "Profile updated successfully!")
            // setLoading(false)
            })
            .error(error => {
            console.log('Showing error', error)
            // showSnackBar(Config.SnackBarEnum.ERROR, error?.meta?.message ?? "Something went wrong! we are fixing it.")
            // setLoading(false)
            })
            .build()
            .doRequest()
    }
    return (
        <View style={Layout.fill}>
           <WeeklyDetails
                totalStats = {totalStats}
                weeklyStats = {weeklyStats}
           />
        </View>
    );
}

export default WeeklyStats;