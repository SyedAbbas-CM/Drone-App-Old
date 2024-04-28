//import liraries
import React, { Component } from 'react'
import { TouchableOpacity, Image, StyleSheet } from 'react-native'
import { useTheme } from '@/Hooks'
import { goBack } from '../Navigators/utils'
import { WP } from '../Theme/Responsive'
import { Colors } from '../Theme/Variables'



// create a component
const VeroGoButton = props => {
    const { isOnline } = props
    const { Layout, Images, Colors } = useTheme()
  return (
    <TouchableOpacity onPress={props?.onPressGo} style={styles.container}>
    {isOnline? 
      <Image source={Images.cross} style={styles.crossButton}/>
      : 
      <Image source={Images.go} style={styles.goButton}/>
    }
    </TouchableOpacity>
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
        tintColor: Colors.orange
    },
    crossButton: {
      width: WP('19'),
      height: WP('19'),
      resizeMode: 'contain',
      tintColor: Colors.red
  }
})
//make this component available to the app
export default VeroGoButton
