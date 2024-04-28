//import liraries
import * as React from 'react'
import { TouchableOpacity, View, StyleSheet } from 'react-native'
import { List, Avatar } from 'react-native-paper';
import { Colors } from '@/Theme/Variables';
// create a component
const ItemDetail = props => {
  console.log('In Qoute Item', props)
  const {item_image} = props

  // pressAction = () => navigate('Details', demo)
  return (
      <List.Item 
          onPress={()=> props?.onPressItem(props)}
          style={{backgroundColor: Colors.white}} 
          left={props => <Avatar.Image size={50} 
          source={{ uri: item_image }} />}
          title="Item"
         />
  )
}
export default ItemDetail
