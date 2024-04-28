import React from 'react'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Button,
  Switch,
} from 'react-native'
import { Colors } from '@/Theme/Variables'
import { WP } from '@/Theme/Responsive'
import { useTheme } from '@/Hooks'
import { VeroBarChart } from '@/Components'
import moment from 'moment'
import Trips from './Trips'
import VeroDatePicker from '@/Components/VeroDatePicker'

const WeeklyDetails = props => {
  console.log('props in weekly summary', props)
  const { totalStats, dailyStats } = props
  const { Layout } = useTheme()
  const date = new Date()
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.textGrey}>
          {moment(date)?.format('ddd, DD MMMM YYYY')}
        </Text>
        <Text style={styles.textBold}>
          $
          <Text style={{ color: 'black', fontSize: WP('8') }}>
            {totalStats?.amount}
          </Text>
        </Text>
        <VeroBarChart dailyStats={dailyStats} switchChart={props.value} />
        <View style={styles.datePickerContainer}>
          <Text style={styles.dateText}>Select Date: </Text>
          <VeroDatePicker
            date={props.fromDate}
            onDateChange={props.onFromDateChange}
          />
          <VeroDatePicker
            date={props.toDate}
            onDateChange={props.onToDateChange}
          />
          <Button
            title="Submit"
            onPress={() => props.onSubmitPress()}
            color={Colors.orange}
          />
        </View>
        <View style={styles.switchContainer}>
          <Text style={styles.dateText}>Switch Chart: </Text>
          <Text> Trips </Text>

          <Switch
            trackColor={{ false: '#FC8724', true: '#FC8724' }}
            thumbColor={'#f4f3f4'}
            ios_backgroundColor="#FC8724"
            onValueChange={props.onValueChange}
            value={props.value}
          />
          <Text> Amount </Text>
        </View>
        <View style={styles.divider}></View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={styles.boxContainer}>
            <Text style={Layout.textNumbers}>{totalStats?.trips}</Text>
            <Text style={Layout.text}>Trips</Text>
          </View>
          <View style={Layout.dividerVertical}></View>
          <View style={styles.boxContainer}>
            <Text style={Layout.textNumbers}>{totalStats?.time}</Text>
            <Text style={Layout.text}>Online Hours</Text>
          </View>
          <View style={Layout.dividerVertical}></View>
          <View style={styles.boxContainer}>
            <Text style={Layout.textNumbers}>${totalStats?.amount}</Text>
            <Text style={Layout.text}>Cash Trip</Text>
          </View>
        </View>
      </View>
      <Text style={styles.headText}>TRIPS</Text>
      <Trips dailyStats={dailyStats} />
      {/* <View style={styles.container}>
      <View style={styles.rowView}>
        <Text style={styles.text}>Trip fares</Text><Text style={styles.text2}>$40.25</Text>
        </View>
        <View style={styles.rowView}>
        <Text style={styles.text}>YellowTaxi Fee</Text><Text style={styles.text2}>$20.15</Text>
        </View>
        <View style={styles.rowView}>
        <Text style={styles.text}>+Tax</Text><Text style={styles.text2}>$400.45</Text>
        </View>
        <View style={styles.rowView}>
        <Text style={styles.text}>+Tolls</Text><Text style={styles.text2}>$64.85</Text>
        </View>
        <View style={styles.rowView}>
        <Text style={styles.text}>Surge</Text><Text style={styles.text2}>$5.3</Text>
        </View>
        <View style={styles.rowView}>
        <Text style={styles.text}>Discount(-)</Text><Text style={styles.text2}>$5.25</Text>
        </View>
        <View style={styles.divider3}></View>
        <View style={styles.rowView}>
        <Text style={[styles.text, {color: Colors.orange, fontWeight: 'bold'}]}>Your payment</Text><Text style={[styles.text2, {color: Colors.orange, fontWeight: 'bold'}]}>$515.15</Text>
        </View> */}

      {/* </View> */}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    marginTop: WP('1'),
  },
  datePickerContainer: {
    marginTop: WP('10'),
    flexDirection: 'row',
    alignItems: 'center',
    // width: WP('80'),
    marginLeft: WP('2'),
  },
  switchContainer: {
    marginTop: WP('2'),
    flexDirection: 'row',
    marginLeft: WP('2'),
    alignItems: 'center',
    // alignSelf: 'center',
  },
  dateText: {
    fontSize: WP('4'),
    fontWeight: 'bold',
    color: Colors.black,
  },
  text: {
    fontSize: WP('4.5'),
    marginVertical: WP('1'),
    margin: WP('5'),
  },
  text2: {
    fontSize: WP('4.5'),
    marginVertical: WP('1'),
    right: WP('5'),
    position: 'absolute',
  },
  textBold: {
    fontSize: WP('6'),
    fontWeight: 'bold',
    color: Colors.orange,
    marginTop: WP('1'),
    textAlign: 'center',
  },
  textGrey: {
    fontSize: WP('4'),
    color: Colors.black,
    marginTop: WP('8'),
    textAlign: 'center',
  },
  divider: {
    borderWidth: WP(0.1),
    marginTop: WP('5'),
    width: WP('100'),
    borderColor: 'grey',
  },
  divider2: {
    borderWidth: WP(0.1),
    width: WP('100'),
    borderColor: 'grey',
  },
  divider3: {
    borderWidth: WP(0.1),
    width: WP('100'),
    marginTop: WP('4'),
    borderColor: 'grey',
  },
  boxContainer: {
    width: WP('33'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  headText: {
    fontSize: WP('4.5'),
    fontWeight: 'bold',
    color: Colors.black,
    marginTop: WP('5'),
    marginLeft: WP('5'),
  },
  rowView: {
    flexDirection: 'row',
    marginTop: WP('3'),
  },
})

export default WeeklyDetails
