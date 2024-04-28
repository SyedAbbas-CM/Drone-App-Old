import React , { useState }from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { useTheme } from '@/Hooks'
import { goBack } from '../Navigators/utils'
import { useTranslation } from 'react-i18next'
import { VeroButton, VeroTextInput} from '@/Components';
import { WP } from '@/Theme/Responsive';
import { Colors } from '@/Theme/Variables'
import Ionicon from 'react-native-vector-icons/Ionicons'



const TopHeaderPickup = (props) => {
  console.log("Props in IMage heager", props);
  
  const { name, pickupFrom, serviceType, status } = props
  const { t } = useTranslation()
const { Layout, Images, Colors, Gutters } = useTheme()
const {signatureImage, deliveryImage } = props


  return (
  <View style={styles.requestHeader}>
  {/* <View style={Gutters.largeTMargin}> */}
  <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: WP('2')}}>
  <VeroButton style={{width: WP('60')}} title="End Trip"
  onPress={props?.onPressEnd}
 />
 <TouchableOpacity onPress={props?.onPressMessage} style={{marginTop: WP('5')}}>
   <Icon name="chatbox-ellipses-sharp" size={30} color={"#000000"}/>
   </TouchableOpacity>
   <View style={styles.verticalDivider}></View>
  <TouchableOpacity onPress={props?.onPressCall} style={{marginTop: WP('5')}}>
  <Icon name="ios-call" size={28} color={"#000000"}/>
  </TouchableOpacity>
 </View>
  <Text style={styles.dimedText}>Dropoff Address</Text>
  <Text style={styles.text}>{pickupFrom}</Text>
  <View style={styles.divider}></View>
  <Text style={styles.dimedText}>Service Request Type</Text>
  <Text style={styles.text}>{serviceType}</Text>
  <View style={styles.divider}></View>
  <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
  {/* <Text>Uplaod Receipt</Text>
  <Text>Uplaod Delivery Location Picture</Text> */}
      <View style={styles.uploadBox}>

      {signatureImage ?  
      <Image source={{uri: signatureImage }} style={styles.image} />
      :
      <>
      <Text>{t("uploadSignature")}</Text>
      <TouchableOpacity onPress={props.onPressSignature}>
      <Ionicon name='ios-add-sharp' size={25} color={Colors.darkGrey}/>
      </TouchableOpacity>
      </>
      }
      </View>
      <View style={styles.uploadBox}>
      {deliveryImage? 
        <Image source={{uri: deliveryImage?.uri}} style={styles.image}/>
      :
      <>
      <Text>{t("deliveryProof")}</Text>
      <TouchableOpacity onPress={props.onPressPicture}>
      <Ionicon name='ios-add-sharp' size={25} color={Colors.darkGrey}/>
      </TouchableOpacity>
      </>
      }
      </View>
  </View>
  <View style={styles.divider}></View>
  <Text style={styles.requestHeaderText}>{t("enterAmount")}</Text>
  <VeroTextInput
        isHeader={true}
        keyboardType='decimal-pad'
        value={props?.value}
        onChangeText={props?.onChangeText}
      />
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
            padding: WP('1'),
            backgroundColor: Colors.white,
          },
          uploadBox: {
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: WP('2'),
            marginBottom: WP('2'),
            borderRadius: WP('3'),
            width: WP('40'),
            height: WP('40'),
            backgroundColor: Colors.white,
            elevation: WP('6'),
            shadowOpacity: WP('0.1'),
            shadowRadius: WP('2')
          },
          requestHeaderText: {
            color: Colors.grey,
            marginTop: WP('1'),
            fontSize: WP('3.5'),
            marginLeft: WP('10')
          },
          image: {
            width: WP('40'), 
            height: WP('40'),
            borderRadius: WP('3')
          },
          verticalDivider: {
            borderWidth: WP(0.1),
            height: WP('10'),
            borderColor: 'black',
            marginTop: WP('3.5')
          }
})

export default TopHeaderPickup;