import * as React from 'react'
import { TouchableOpacity, View, StyleSheet } from 'react-native'
import { useTheme } from '@/Hooks'
import { List, Avatar } from 'react-native-paper';
import { WP } from '../Theme/Responsive'
import { Colors } from '../Theme/Variables';

const VeroItemsList = props => {
  console.log("props in item list", props);
  const {image, name, qty} = props
  
  const { Layout, Fonts } = useTheme()
  return (
        <List.Item 
          onPress={()=> props?.onPressItem(props)}
          style={{backgroundColor: Colors.white}} 
          left={props => <Avatar.Image size={50} 
          source={{ uri: image }} />}
          title={name}
          description={`${qty}`} />
  )
}

const styles = StyleSheet.create({
    container: {
        margin: WP('0.2'), 
        borderRadius: WP('5'), 
        // width: WP('80'),
        elevation: WP('1'),
        // shadowOpacity: WP('0.1'),
        // shadowRadius: WP('2')
    }
})

export default VeroItemsList
