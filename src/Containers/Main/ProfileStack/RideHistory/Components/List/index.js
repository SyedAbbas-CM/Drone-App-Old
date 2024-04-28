//import liraries
import React, { Component, useEffect } from 'react'
import { FlatList, RefreshControl, Text } from 'react-native'
import ItemDetail from '../Listitem'
// create a component
const ItemsList = props => {
  console.log("Showing item in list", props?.data)
  const renderItem = ({ item }) => (    
    <ItemDetail
      onPressItem={props?.onPressItem}
      status={item.status}
      is_active={item.is_active}
      service_type={item.service_type} 
      created_at={item.created_at}
      ride={item}
    />
  )
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={props?.data}
      renderItem={renderItem}
    />
  )
}

//make this component available to the app
export default ItemsList
