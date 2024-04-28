import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, Image, TouchableOpacity } from "react-native";
import { WP } from "@/Theme/Responsive";
import { Colors } from "@/Theme/Variables";
import Icon from 'react-native-vector-icons/Entypo'
import { useTheme } from '@/Hooks'


const PackagePickupModal = (props) => {
    console.log("package pickup data", props);
    const { name, qty, item_weight, size, image } = props?.data
    const { Layout, Images, Colors } = useTheme()

    
  return (
    <View style={styles.centeredView}>
      <Modal
       {...props}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <TouchableOpacity onPress={props.onPressCross} style={{position: 'absolute', top: WP('4'), right: WP('4')}}>
          <Icon name="circle-with-cross" size={30} color={"#000000"}/>
          </TouchableOpacity>
            <Text style={styles.modalText}>{name}</Text>
            <Image style={styles.image} source={{ uri: image}}/>
            <Text style={styles.description}>{`Package Type  »  ${qty}`}</Text>
            <Text style={styles.description}>{`Package Weight  »  ${item_weight}`}</Text>
            <Text style={styles.description}>{`Size  »  ${size}`}</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15
  },
  modalView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.grey,
    margin: 20,
    width: WP('90'),
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  image: {
    width: WP('50'), 
    height: WP('50'),
    borderRadius: WP('4')
  },
  modalText: {
    fontSize: WP('5.5'),
    fontWeight: 'bold',
    marginBottom: WP('5'),
    textAlign: "center"
  },
  description: {
    fontSize: WP('4'),
    fontWeight: 'bold',
    textAlign: "center"
  }
});

export default PackagePickupModal;