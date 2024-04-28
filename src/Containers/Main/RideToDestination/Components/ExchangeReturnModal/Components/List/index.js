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
      reciept_image={item.reciept_image}
      item_image={item.item_image}
      details={item.details} 
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
