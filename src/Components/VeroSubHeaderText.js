import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@/Hooks'

const VeroSubHeaderText = (props) => {
    const { Layout, Images, Colors } = useTheme()
  return (<View>
            <Text style={Layout.subHeaderText}>{props.title}</Text>
            <Text style={Layout.subHeaderPhone}>{props.number}</Text>
        </View>
        )
}

export default VeroSubHeaderText;