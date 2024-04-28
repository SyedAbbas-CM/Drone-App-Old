import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Colors } from '@/Theme/Variables';
import { WP } from '@/Theme/Responsive';
import { useTheme } from '@/Hooks'

const RideHistoryDetail = (props) => {
  const { Layout } = useTheme()
  return (
    <ScrollView>
      <View style={styles.container}>
           <Text style={styles.text}>● 1 Ash Park, Pembroke Dock, SA72 </Text>
           <Text style={styles.text}><Text style={{color: Colors.orange}}>■</Text> 54 Hollybank Rd, Southampton</Text>
           <Text style={styles.textBold}> $153.75 </Text>
           <Text style={styles.textGrey}> Payment made sucessfully by Cash</Text>
           <View style={styles.divider}></View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={styles.boxContainer}>
            <Text style={Layout.textNumbers}>15 min</Text>
            <Text style={Layout.text}>Time</Text>
        </View>
        <View style={Layout.dividerVertical}></View>
        <View style={styles.boxContainer}>
        <Text style={Layout.textNumbers}>45 mi</Text>
            <Text style={Layout.text}>Distance</Text>
        </View>
        </View>
        <View style={styles.divider2}></View>
        <View style={{flexDirection: 'row', marginTop: WP('5')}}>
        <Text style={styles.text}>Date & Time</Text><Text style={styles.text2}>01 Mar 22 at 10:47 am</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
        <Text style={styles.text}>Service Type</Text><Text style={styles.text2}>Pick Up</Text>
        </View>
      </View> 
      <Text style={styles.headText}>RECEIPT</Text>
      <View style={styles.container}>
      <View style={styles.rowView}>
        <Text style={styles.text}>Trip fares</Text><Text style={styles.text2}>$40.25</Text>
        </View>
        <View style={styles.rowView}>
        <Text style={styles.text}>YellowTaxi Fee</Text><Text style={styles.text2}>$20.15</Text>
        </View>
        <View style={styles.rowView}>
        <Text style={styles.text}>+Tax</Text><Text style={styles.text2}>$400.45</Text>
        </View>
        <View style={styles.rowView}>
        <Text style={styles.text}>+Tolls</Text><Text style={styles.text2}>$64.85</Text>
        </View>
        <View style={styles.rowView}>
        <Text style={styles.text}>Discount</Text><Text style={styles.text2}>$5.3</Text>
        </View>
        <View style={styles.rowView}>
        <Text style={styles.text}>+Topup Added</Text><Text style={styles.text2}>$5.25</Text>
        </View>
        <View style={styles.divider3}></View>
        <View style={styles.rowView}>
        <Text style={[styles.text, {color: Colors.orange, fontWeight: 'bold'}]}>Your payment</Text><Text style={[styles.text2, {color: Colors.orange, fontWeight: 'bold'}]}>$515.15</Text>
        </View>
        
      </View>
    </ScrollView>
  );
  
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: Colors.white,
        marginTop: WP('1')
    },
    text:{
      fontSize: WP('4.5'), 
      marginVertical: WP('1'),
      margin: WP('5')
    }, 
    text2:{
      fontSize: WP('4.5'), 
      marginVertical: WP('1'),
      right: WP('5'),
      position: 'absolute'
    }, 
    textBold: {
      fontSize: WP('8'), 
      fontWeight: 'bold',
      color: Colors.orange,
      marginTop: WP('8'),
      textAlign: 'center'
    },
    textGrey:{
      fontSize: WP('5'), 
      color: Colors.grey,
      marginTop: WP('4'),
      textAlign: 'center'
    },
    divider: {
      borderWidth: WP(0.1),
      marginTop: WP('10'),
      width: WP('100'),
      borderColor: 'grey'
  },
  divider2: {
    borderWidth: WP(0.1),
    width: WP('100'),
    borderColor: 'grey'
},
divider3: {
  borderWidth: WP(0.1),
  width: WP('100'),
  marginTop: WP('4'),
  borderColor: 'grey'
},
  boxContainer: {
    width: WP('50'),
    justifyContent: 'center',
    alignItems: 'center'
},
headText:{
  fontSize: WP('4.5'),
  fontWeight: 'bold',
  color: Colors.black,
  marginTop: WP('5'),
  marginLeft: WP('5')
},
rowView:{
  flexDirection: 'row', 
  marginTop: WP('3')
}
})

export default RideHistoryDetail;