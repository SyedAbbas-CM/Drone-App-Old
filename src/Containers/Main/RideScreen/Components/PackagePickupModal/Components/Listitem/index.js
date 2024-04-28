//import liraries
import React, { Component } from 'react'
import VeroItemsList from '@/Components/VeroItemList'
// create a component
const ItemDetail = props => {
  console.log('In Qoute Item', props)
  // pressAction = () => navigate('Details', demo)
  return (
    <VeroItemsList
      onPressItem={props?.onPressItem}
      name={props.item_type}
      qty={props.package_type}
      item_weight={props.item_weight} 
      size={props.size}
      image={props.uri}
      // onPress={pressAction}
    />
  )
}
export default ItemDetail
