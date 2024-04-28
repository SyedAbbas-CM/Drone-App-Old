import React, { useEffect, useState } from 'react'
import { BarChart } from 'react-native-gifted-charts'
import { Colors } from '../Theme/Variables'
import moment from 'moment'

const VeroBarChart = ({ dailyStats, switchChart }) => {
  let barArray = []
  let barArrayAmount = []
  console.log('Daily stats', dailyStats, switchChart)
  const [barData, setBarData] = useState([])
  const [barDataAmount, setBarDataAmount] = useState([])

  useEffect(() => {
    if (dailyStats) {
      for (const [key, value] of Object.entries(dailyStats)) {
        // console.log(`${key}: ${value}`)
        barArray.push({
          value: value.trips,
          label: moment(key)?.format('DD MMM'),
        })
        barArrayAmount.push({
          value: value.amount,
          label: moment(key)?.format('DD MMM'),
        })
      }
      setBarData(barArray)
      setBarDataAmount(barArrayAmount)
    }
    console.log('Bar Dtaa', barData)
  }, [dailyStats])
  // const barData = [
  //   {value: 250, label: 'M'},
  //   {value: 500, label: 'T'},
  //   {value: 750, label: 'W'},
  //   {value: 320, label: 'T'},
  //   {value: 600, label: 'F'},
  //   {value: 256, label: 'S'},
  //   {value: 300, label: 'S'},
  // ]
  return (
    <BarChart
      barWidth={45}
      noOfSections={3}
      barBorderRadius={4}
      frontColor={Colors.orange}
      data={
        barData && barDataAmount
          ? switchChart
            ? barDataAmount
            : barData
          : null
      }
      yAxisThickness={0}
      xAxisThickness={0}
    />
  )
}

export default VeroBarChart
