import React , { useState }from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@/Hooks'
import { useTranslation } from 'react-i18next'
import { WP } from '@/Theme/Responsive';

const RequestHeaderPurchase = (props) => {
  const { t } = useTranslation()
const { Layout, Images, Colors, Gutters } = useTheme()


  return (
  <View style={Layout.requestHeader}>
  <View style={Gutters.largeTMargin}>
  <Text style={Layout.requestHeaderText}>{t("serviceType")}</Text>
   <Text style={styles.text}>{props?.serviceType}</Text>
      <View style={styles.divider}></View>
    <Text style={Layout.requestHeaderText}>{t("pickupitem")}</Text>
    <Text style={styles.text}>{props?.pickupFrom}</Text>
      <View style={styles.divider}></View>
    <Text style={Layout.requestHeaderText}>{t("timeToReach")}</Text>
    <Text style={styles.text}>{props?.timeToReach}</Text>
      <View style={styles.divider}></View>
      </View>
  </View>
  )
}

const styles = StyleSheet.create({
  divider: {
    borderWidth: WP(0.1),
    alignSelf: "center",
    // marginTop: WP('5'),
    width: WP('85'),
    borderColor: 'grey'
},
text: {
    width: WP('85'),
    alignSelf: 'center',
    marginBottom: WP('1'),
    marginTop: WP('2'),
    fontSize: WP('3.8'),
    borderRadius: WP('0.8'),
    // paddingLeft: WP('3'),
    // paddingRight: WP('3'),
  },
})

export default RequestHeaderPurchase;