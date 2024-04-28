import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@/Hooks'
import { useTranslation } from 'react-i18next'
import { VeroHeader } from '@/Components';
import { Colors } from '@/Theme/Variables';
import { WP } from '@/Theme/Responsive';
import { navigate } from '@/Navigators/utils';
import { VeroLoader } from '@/Components';
import RideHistoryDetail from './Components/RideHistoryDetail'

const RideDetails = (props) => {
console.log("props in item details", props);
    
  const { t } = useTranslation()
  const { Layout } =useTheme()
  
  return (
  <View style={Layout.fill}>
    <VeroHeader title={t("rideDetails")}/>
    <RideHistoryDetail/>
  </View>
     
);
}

export default RideDetails;