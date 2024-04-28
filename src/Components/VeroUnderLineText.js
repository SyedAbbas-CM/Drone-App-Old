import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@/Hooks'

const VeroUnderLineText = (props) => {
    const { Layout, Images, Colors } = useTheme()
  return (<TouchableOpacity onPress={props.onPress}>
            <Text style={Layout.underLineText}>{props.title}</Text>
        </TouchableOpacity>
        )
}

export default VeroUnderLineText;