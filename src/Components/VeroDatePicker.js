//import liraries
import React, { Component } from 'react'
import { TouchableOpacity, Image, StyleSheet } from 'react-native'
import { useTheme } from '@/Hooks'
import { goBack } from '../Navigators/utils'
import { WP } from '../Theme/Responsive'
import { Colors } from '../Theme/Variables'
import DatePicker from 'react-native-datepicker'

// create a component
const VeroDatePicker = ({ date, onDateChange }) => {
  const { Layout, Images, Colors } = useTheme()
  return (
    <DatePicker
      style={{ width: 100, marginLeft: 5 }}
      date={date}
      mode="date"
      placeholder="select date"
      format="YYYY-MM-DD"
      //   minDate="2016-05-01"
      maxDate={new Date()}
      confirmBtnText="Confirm"
      showIcon={false}
      cancelBtnText="Cancel"
      customStyles={{
        dateInput: {
          //   marginLeft: 36,
        },
        // ... You can check the source to find the other keys.
      }}
      onDateChange={value => onDateChange(value)}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: WP('10'),
    alignSelf: 'center',
  },
  goButton: {
    width: WP('20'),
    height: WP('20'),
    resizeMode: 'contain',
    tintColor: Colors.orange,
  },
  crossButton: {
    width: WP('19'),
    height: WP('19'),
    resizeMode: 'contain',
    tintColor: Colors.red,
  },
})
//make this component available to the app
export default VeroDatePicker
