import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@/Hooks'
import { useTranslation } from 'react-i18next'
import { VeroHeader } from '@/Components';
import { VeroLoader } from '@/Components';
import ItemsList from './Components/List';
import { useSelector } from 'react-redux';
import ItemDetail from './Components/Listitem';

const MyVehicle = (props) => {
const user = useSelector(state => state.user.user)
  const { t } = useTranslation()
  const { Layout } =useTheme()
  const [loading, setLoading] = useState(false)

  return (
  <View style={Layout.fill}>
    <VeroHeader title={t("myvehicle")}/>
    <ItemDetail data={user?.car} onPressItem={(item)=>console.log(item)}/>
    {loading && <VeroLoader/>}
  </View>
     
);
}

export default MyVehicle;