import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { Colors } from '@/Theme/Variables'
import { WP } from '@/Theme/Responsive'
import { useTheme } from '@/Hooks'
import moment from 'moment'

const Trips = ({ dailyStats }) => {
  let tripsArray = []
  const { Layout } = useTheme()
  const [trips, setTrips] = useState([])
  useEffect(() => {
    if (dailyStats) {
      for (const [key, value] of Object.entries(dailyStats)) {
        // console.log(`${key}: ${value}`)
        tripsArray.push({
          date: key,
          trips: value.trips,
          amount: value.amount,
        })
      }
      setTrips(tripsArray)
    }
  }, [dailyStats])
  return (
    <View style={styles.container}>
      {trips &&
        trips.map(item => {
          return (
            <View style={styles.listView}>
              <View style={styles.rowView}>
                <Text style={styles.text}>
                  {moment(item.date).format('ddd, DD MMM')}
                </Text>
                <Text style={styles.text2}>${item.amount}</Text>
              </View>
              <Text style={styles.textGrey}>{item.trips} Trips</Text>
            </View>
          )
        })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    marginTop: WP('1'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  listView: {
    margin: WP('2'),
    width: WP('90'),
    borderBottomWidth: WP('0.1'),
    borderColor: Colors.grey,
  },
  text: {
    fontSize: WP('4.5'),
    marginVertical: WP('1'),
  },
  text2: {
    fontSize: WP('4.5'),
    marginVertical: WP('1'),
    right: WP('5'),
    position: 'absolute',
  },
  textGrey: {
    fontSize: WP('4'),
    color: Colors.darkGrey,
    marginVertical: WP('1'),
  },
  rowView: {
    flexDirection: 'row',
    marginTop: WP('3'),
  },
})

export default Trips
