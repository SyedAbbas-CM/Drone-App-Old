import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons'
import { WP } from '@/Theme/Responsive';
import { Colors } from '@/Theme/Variables';

const ProfileLineItem = ({text, icon, onPress}) => {
  return (
    <TouchableOpacity style={styles.conatiner} onPress={onPress}>
    <Ionicon name={icon} size={18} style={styles.icon} color={Colors.darkGrey}/>
    <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    conatiner: {
        backgroundColor: Colors.white,
        alignItems:'center',
        flexDirection:'row'
    },
    text: {
        fontSize: WP('4'),
        color: Colors.black
    }, 
    icon: {
        margin: WP('5')
    }
})

export default ProfileLineItem;