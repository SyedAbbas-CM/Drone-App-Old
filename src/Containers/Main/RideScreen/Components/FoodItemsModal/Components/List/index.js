//import liraries
import React, { Component } from 'react'
import { FlatList, RefreshControl } from 'react-native'
import ItemDetail from '../Listitem'
// create a component
const ItemsList = props => {
  console.log("Showing item in list", props)

  const renderItem = ({ item }) => (    
    <ItemDetail
      onPressItem={props?.onPressItem}
      name={item.name}
      qty={item.qty}
      size={item.size} 
      crust={item.crust}
      extras={item.extras}
      uri={item.image[0]}
    />
  )
  return (
    <FlatList
      // onPress={()=> console.warn("tigardam")}
      showsVerticalScrollIndicator={false}
      data={props?.data}
      renderItem={renderItem}
    />
  )
}

//make this component available to the app
export default ItemsList
