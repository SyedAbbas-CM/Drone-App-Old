import React , { useState }from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { useTheme } from '@/Hooks'
import { useTranslation } from 'react-i18next'
import { VeroButton } from '@/Components';
import { WP } from '@/Theme/Responsive';
import { Colors } from '@/Theme/Variables'


const FullScreenHeader = (props) => {
const { onPress } = props
const { name, pickupFrom, serviceType, status } = props
const { t } = useTranslation()
const { Layout, Images, Colors, Gutters } = useTheme()


  return (
  <View style={styles.requestHeader}>
   <TouchableOpacity onPress={onPress} style={Layout.backButton}>
      <Icon name="arrow-back" size={25} color={"#000000"}/>
    </TouchableOpacity>
    {/* <VeroButton style={{width: WP('70'), marginLeft: WP('5'), marginBottom: WP('3')}} title="End Trip"/> */}
  </View>
  )
}

const styles=StyleSheet.create({
          requestHeader: {
              flexDirection: 'row',
            // marginTop: WP('1'),
              width:WP('100'),
              height: WP('16'),
              backgroundColor: Colors.white,
          },
})

export default FullScreenHeader;