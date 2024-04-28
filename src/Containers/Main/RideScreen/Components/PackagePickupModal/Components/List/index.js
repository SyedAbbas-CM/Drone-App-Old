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
      package_type={item.package_type}
      item_type={item.item_type}
      item_weight={item.item_weight} 
      size={item.size}
      uri={item.image}
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
