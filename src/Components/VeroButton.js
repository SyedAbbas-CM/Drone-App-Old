import React from 'react';
import { View,  TouchableOpacity, Text} from 'react-native';
import { Button } from 'react-native-paper';
import { useTheme } from '@/Hooks'

// import { Container } from './styles';

const VeroButton = (props) => {
    const { Layout, Colors } = useTheme()
    const { mode, isDisabled } = props

  return (
    <TouchableOpacity
    style={[Layout.veroButton, 
          mode === 'outlined' && { backgroundColor: Colors.transparent}, 
          props.style,
          isDisabled && { backgroundColor: Colors.disable} ]}
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

export default VeroButton;