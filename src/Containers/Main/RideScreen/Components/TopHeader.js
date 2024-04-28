import React , { useState }from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { useTheme } from '@/Hooks'
import { goBack } from '../Navigators/utils'
import { useTranslation } from 'react-i18next'
import { VeroTextInput } from '@/Components';
import { VeroButton } from '../../../../Components';
import { WP } from '../../../../Theme/Responsive';
import { Colors } from '../../../../Theme/Variables'


const TopHeader = (props) => {
  const { name, pickupFrom, serviceType, status } = props
  const { t } = useTranslation()
const { Layout, Images, Colors, Gutters } = useTheme()


  return (
  <View style={styles.requestHeader}>
  {/* <View style={Gutters.largeTMargin}> */}

  <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: WP('2')}}>
  <VeroButton style={{width: WP('60')}} title="Start Trip"
  onPress={props?.onPressStart}
 />
 <TouchableOpacity onPress={props?.onPressMessage} style={{marginTop: WP('5')}}>
   <Icon name="chatbox-ellipses-sharp" size={30} color={"#000000"}/>
   </TouchableOpacity>
   <View style={styles.verticalDivider}></View>
  <TouchableOpacity onPress={props?.onPressCall} style={{marginTop: WP('5')}}>
  <Icon name="ios-call" size={28} color={"#000000"}/>
  </TouchableOpacity>
 </View>
  <Text style={styles.text}>{name}</Text>
  <View style={styles.divider}></View>
    <Text style={styles.dimedText}>{t("pickupFrom")}</Text>
<Text style={styles.text}>{pickupFrom}</Text>
<View style={styles.divider}></View>
    <Text style={styles.dimedText}>Service Request Type</Text>
<Text style={styles.text}>{serviceType}</Text>
<View style={styles.divider}></View>
<Text style={styles.dimedText}>Status</Text>
<Text style={styles.text}>{status}</Text>
<View style={styles.divider}></View>
  </View>
  )
}

const styles=StyleSheet.create({
    divider: {
            borderWidth: WP(0.1),
            alignSelf: "center",
            // marginTop: WP('5'),
            width: WP('80'),
            borderColor: 'grey'
        },
        text: {
            width: WP('85'),
            alignSelf: 'center',
            marginBottom: WP('1'),
            marginTop: WP('2'),
            fontSize: WP('3.8'),
            borderRadius: WP('0.8'),
            paddingLeft: WP('3'),
            paddingRight: WP('3'),
          },
          dimedText: {
            width: WP('85'),
            alignSelf: 'center',
            fontSize: WP('3.5'),
            borderRadius: WP('0.8'),
            paddingLeft: WP('3'),
            paddingRight: WP('3'),
            color: Colors.grey,
            marginTop: WP('2'),
          },
          requestHeader: {
            marginTop: WP('1'),
              width:WP('100'),
              height: WP('75'),
              backgroundColor: Colors.white,
          },
})

export default TopHeader;