import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { useTheme } from '@/Hooks'
import { goBack } from '../Navigators/utils'

const VeroHeader = (props) => {
const { Layout, Images, Colors } = useTheme()
  return (<View style={Layout.headerContainer}>
  <TouchableOpacity onPress={() => goBack()} style={Layout.headerBackButton}>
      <Icon name="arrow-back" size={25} color={"#000000"}/>
    </TouchableOpacity>
  <Text style={Layout.headerTitleText}>{props.title}</Text>
  </View>
  )
}

export default VeroHeader;