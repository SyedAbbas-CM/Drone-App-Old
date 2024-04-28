import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { useTheme } from '@/Hooks'
import WeeklyDetails from './Components/WeeklyDetails'
import { APIRequest } from '@/Services/ApiRequest'
import { useSelector } from 'react-redux'
import { VeroLoader } from '@/Components'
import moment from 'moment'

const WeeklyStats = () => {
  const { Layout } = useTheme()
  const user_id = useSelector(state => state.user.user._id)
  const [totalStats, setTotalStats] = useState()
  const [date, setDate] = useState(new Date())
  const [loading, setLoading] = useState()
  const [toggleSwitch, setToggleSwitch] = useState(false)
  const [fromDate, setFromDate] = useState(new Date())
  const [weeklyStats, setWeeklyStats] = useState()

  useEffect(() => {
    getStats()
  }, [])
  //  .reqURL(`driver/${user_id}/stats?toDate=${2022-09-28}&fromDate=2022-05-23`)

  const getStats = () => {
    setLoading(true)
    new APIRequest.Builder()
      .get()
      .reqURL(
        `driver/${user_id}/stats?toDate=${moment(date).format(
          'YYYY-MM-DD',
        )}&fromDate=${moment(fromDate).format('YYYY-MM-DD')}`,
      )
      .jsonParams()
      .response(response => {
        console.log('Response ', response)
        setTotalStats(response?.data?.data?.totalStats)
        setWeeklyStats(response?.data?.data?.dailyStats)
        setLoading(false)
        // dispatch(userAuth(response?.data?.data))
        // showSnackBar(Config.SnackBarEnum.SUCCESS, "Profile updated successfully!")
      })
      .error(error => {
        console.log('Showing error', error)
        setLoading(false)
        // showSnackBar(Config.SnackBarEnum.ERROR, error?.meta?.message ?? "Something went wrong! we are fixing it.")
      })
      .build()
      .doRequest()
  }
  return (
    <View style={Layout.fill}>
      <WeeklyDetails
        totalStats={totalStats}
        dailyStats={weeklyStats}
        toDate={date}
        onToDateChange={value => setDate(value)}
        fromDate={fromDate}
        onFromDateChange={value => setFromDate(value)}
        onSubmitPress={() => getStats()}
        onValueChange={value => setToggleSwitch(value)}
        value={toggleSwitch}
      />
      {loading && <VeroLoader />}
    </View>
  )
}

export default WeeklyStats
