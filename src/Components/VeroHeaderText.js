import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@/Hooks'

const VeroHeaderText = (props) => {
    const { Layout, Images, Colors } = useTheme()
  return <Text style={Layout.headerText}>{props.title}</Text>;
}

export default VeroHeaderText;