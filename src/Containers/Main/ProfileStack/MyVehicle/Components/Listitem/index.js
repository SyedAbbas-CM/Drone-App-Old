//import liraries
import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import { Colors } from '@/Theme/Variables'
import { WP } from '@/Theme/Responsive'
import { useTheme } from '@/Hooks'
const ItemDetail = props => {
  console.log('In Qoute Item', props)
  const { Images } = useTheme()
  const {car_type, car_color, car_make, car_no} = props?.data
    
  // pressAction = () => navigate('Details', demo)
  return (
   <View style={styles.container} 
  //  onPress={()=>props.onPressItem(props)}
   >
   <Image source={Images.carTaxi} style={styles.image}/>
   <Text style={styles.text1}>{`${car_make}`}</Text>
   <Text style={styles.text}>{`${car_no} . ${car_color} . ${car_type}`}</Text>
   </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    marginTop: WP('2'),
    borderRadius: WP('3'),
    width: WP('95'),
    padding: WP('10'),
    backgroundColor: Colors.white
  },
  text1: {
    fontSize: WP('5'), fontWeight: '900'
  },
  text: {
    fontSize: WP('4'),
  },
  image: {
    resizeMode: 'contain',
    width: WP('80'), 
    height: WP('40')
  }
})
export default ItemDetail
