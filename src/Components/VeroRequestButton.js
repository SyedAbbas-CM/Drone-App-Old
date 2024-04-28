import React from 'react';
import { View,  TouchableOpacity, Text} from 'react-native';
import { useTheme } from '@/Hooks'


const VeroRequestButton = (props) => {
    const { Layout, Colors } = useTheme()
    const { mode, isDisabled } = props

  return (
    <TouchableOpacity
    style={[Layout.veroRequestButton, 
          mode === 'reject' && { backgroundColor: Colors.red}]}
    onPress={props.onPress}
  >
    <Text
      style={[Layout.buttonText, props.textStyles]}
    >
      {props.title}
    </Text>
  </TouchableOpacity>
  )
}

export default VeroRequestButton;