import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Switch } from 'react-native';
import { WP } from '@/Theme/Responsive';
import { useTheme } from '@/Hooks'
import { Colors } from '@/Theme/Variables';

const Services = (props) => {
    const { Layout, Images, Colors } = useTheme()
    
  return (
      <>
    <View style={styles.conatiner}>
    <Text style={styles.text}>{props.text}</Text>
    <Switch
        trackColor={{ false: "#767577", true: "#FC8724" }}
        thumbColor={props.value ? "#f4f3f4" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={props.onValueChange}
        value={props.value}
      />
    </View>
    <View style={styles.divider}></View>
    </>
  );
}

const styles = StyleSheet.create({
    conatiner: {
        backgroundColor: Colors.white,
        padding: WP('8'),
        alignItems:'center',
        flexDirection:'row',
        justifyContent: 'space-between'
    },
    text: {
        fontSize: WP('5'),
        color: Colors.black
    }, 
    icon: {
        margin: WP('5')
    },
    divider: {
        borderWidth: WP(0.1),
        width: WP('90'),
        alignSelf: 'center',
        borderColor: 'grey'
    }
})

export default Services;