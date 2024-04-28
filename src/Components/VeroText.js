import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { WP } from '@/Theme/Responsive';

const VeroText = ({text}) => {
  return (
    <ScrollView style={styles.container}>
    <Text style={styles.text}>
        {text}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: 'white', 
        marginTop: WP('1')
    },
    text: {
      fontSize: WP('3.5'),
      margin: WP('3'),
      textAlign: 'justify'
    }
})

export default VeroText;