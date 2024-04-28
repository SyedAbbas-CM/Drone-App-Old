import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { WP } from '@/Theme/Responsive';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const BankInfo = (props) => {
  console.log("porps", props);
  const {bank_name, account_holder, account_number, swift_ifsc_code} = props?.data
  return (
  <View style={styles.container}>
  <View style={styles.mainView}>
  <Icon name="bank-outline" size={70} color={"#000000"}/>
  <View style={styles.innerContainer}>
    <Text style={styles.text}>{bank_name}</Text>
    <Text style={styles.text}>{account_holder}</Text>
    <Text style={styles.text}>{account_number}</Text>
    <View style={styles.main}>
      <TouchableOpacity style={styles.iconContainer} onPress={props?.onPressDelete}>
      <Icon name="trash-can-outline" size={35} color={"#000000"}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer} onPress={props?.onPressEdit}>
      <Icon name="pencil-outline" size={35} color={"#000000"}/>
      </TouchableOpacity>
    </View>
  </View>
  </View>
  </View>
  );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        alignSelf: 'center',
        padding: WP('5'), 
        marginTop: WP('3'),
        borderRadius: WP('5'),
        width: WP('95')
    }, 
    iconContainer: {
      marginTop: WP('3'),
      height: WP('13'),
      width: WP('13'),
      justifyContent: 'center',
      alignItems: 'center',
      // backgroundColor: 'grey',
      borderRadius: WP('100')
    },
    mainView: {
      flexDirection: 'row', 
      justifyContent: 'space-between'
    },
    main: {
      flexDirection: 'row', 
      justifyContent: 'flex-end'
    },
    innerContainer: {
      width: WP('60'),
    },
    text: {
      fontSize: WP('4'), 
      fontWeight: 'bold'
    }
})
export default BankInfo;