//import liraries
import React, { Component } from 'react'
import VeroItemsList from '../../../../../../../Components/VeroItemList'
// create a component
const ItemDetail = props => {
  console.log('In Qoute Item', props)
  // pressAction = () => navigate('Details', demo)
  return (
    <VeroItemsList
      onPressItem={props?.onPressItem}
      name={props.name}
      qty={props.qty}
      price={props.price} 
      category={props.category}
      image={props.uri}
      // onPress={pressAction}
    />
  )
}
export default ItemDetail
