import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { Colors } from '@/Theme/Variables'
import { WP } from '@/Theme/Responsive';

// import { Container } from './styles';

const GasStationButton = (props) => {

  return (
    <TouchableOpacity style={styles.container} onPress={props?.onGassPress} >
    <Icon name="gas-pump" size={30} color={Colors.orange}  />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    container: {
    // flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    //   position: 'absolute',
      marginLeft: WP('5'),
      marginTop: WP('5'),
      width: WP('12'),
      height:WP('12'),
    //   flexDirection: 'row',
      backgroundColor: '#ffffff',
      borderRadius: WP('100'), 
      elevation: WP('6'),
      shadowOpacity: WP('0.1'),
      shadowRadius: WP('2')

    },
    text: {
        fontSize: WP('6'),
        fontWeight: 'bold',
        color: Colors.black
    }
})
export default GasStationButton;