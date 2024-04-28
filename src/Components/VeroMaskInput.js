import * as React from 'react'
import { useTheme } from '@/Hooks'
import { TextInputMask } from 'react-native-masked-text'

const VeroMaskInput = props => {
  const { Layout, Images, Colors } = useTheme()

  return <TextInputMask
    style={Layout.textInputMask}
    type={'cel-phone'}
    maxLength={12}
    options={{
      maskType: 'BRL',
      withDDD: true,
      dddMask: '999-999-9999'
    }}
    {...props}
  />

}

export default VeroMaskInput
