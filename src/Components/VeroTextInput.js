import * as React from 'react'
import { useTheme } from '@/Hooks'
import { TextInput } from 'react-native'

const VeroTextInput = (props) => {
  const { Layout, Images, Colors } = useTheme()
  const { isHeader } = props

  return <TextInput
    style={isHeader ? Layout.textInputHeader : Layout.textInput}
    {...props}
  />

}

export default VeroTextInput
