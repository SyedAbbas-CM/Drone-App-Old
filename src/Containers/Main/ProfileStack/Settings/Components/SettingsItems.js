import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { WP } from '@/Theme/Responsive';
import { Colors } from '@/Theme/Variables';

const SettingsItems = ({text, icon, onPress}) => {
  return (
    <TouchableOpacity style={styles.conatiner} onPress={onPress}>
    {icon == "bank-outline" ?
    <MaterialCommunityIcons name={icon} size={18} color={Colors.darkGrey}/>
    :
    <Ionicon name={icon} size={18} color={Colors.darkGrey}/>
    }
        <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    conatiner: {
        alignItems:'center',
        padding: WP('1.5'),
        marginLeft: WP('6'),
        flexDirection:'row'
    },
    text: {
        margin: WP('4'),
        fontSize: WP('4'),
        color: Colors.black

    }
})

export default SettingsItems;