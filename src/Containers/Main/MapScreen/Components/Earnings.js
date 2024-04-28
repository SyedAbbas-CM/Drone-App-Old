import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { Colors } from '@/Theme/Variables'
import { WP } from '@/Theme/Responsive';

// import { Container } from './styles';

const Earnings = () => {

  return (
    <View style={styles.container}>
    <View style={styles.innerContainer}>
    <Icon name="dollar-sign" size={15} color={Colors.black} />
        <Text style={styles.text}>89.32</Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
    alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: WP('5'),
      width: WP('34'),
      height:WP('12'),
      flexDirection: 'row',
      backgroundColor: '#ffffff',
      borderRadius: WP('10'), 
      elevation: WP('6'),
      shadowOpacity: WP('0.1'),
      shadowRadius: WP('2')
    },
    innerContainer: {
        flexDirection: 'row',
    },
    text: {
        fontSize: WP('6'),
        fontWeight: 'bold',
        color: Colors.black
    }
})
export default Earnings;