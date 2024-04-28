import React , { useState }from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@/Hooks'
import { useTranslation } from 'react-i18next'
import { VeroRequestButton } from '@/Components';

const BottomHeader = (props) => {
    const { t } = useTranslation()
const { Layout, Images, Colors, Gutters } = useTheme()

  return (
  <View style={Layout.bottomHeader}>
    <VeroRequestButton 
    onPress={props?.onPressAccept}
    title={t("accept")}
    />
    <VeroRequestButton
    onPress={props?.onPressReject}
    mode= 'reject'
    title={t("reject")} />
  </View>
  )
}

export default BottomHeader;