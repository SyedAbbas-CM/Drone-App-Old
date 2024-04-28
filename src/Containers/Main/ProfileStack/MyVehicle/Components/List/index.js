//import liraries
import React, { Component, useEffect } from 'react'
import { FlatList, RefreshControl, Text } from 'react-native'
import ItemDetail from '../Listitem'
// create a component
const ItemsList = props => {
  console.log("Showing item in list", props?.data)
  const renderItem = ({ item }) => (   
    console.log("jshdkahskjd", item),
    <ItemDetail
      onPressItem={props?.onPressItem}
      car_type={item.car_type}
      car_color={item.car_color}
      car_make={item.car_make} 
      car_no={item.car_no}
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
