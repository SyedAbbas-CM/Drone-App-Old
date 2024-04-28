import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@/Hooks'
import { Colors } from '@/Theme/Variables'
import { WP } from '@/Theme/Responsive';
import { accessibilityProps } from 'react-native-paper/lib/typescript/components/MaterialCommunityIcon';

// import { Container } from './styles';

const Avatar = (props) => {
    const { Images, Layout}= useTheme()

  return (
    <TouchableOpacity style={styles.container} onPress={props.onPressAvatar} >
    <Image source={Images.avatar} style={styles.image} color={Colors.orange}  />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: WP('5'),
      marginTop: WP('5'),
      width: WP('11'),
      height:WP('11'),
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
    }, 
    image: {
        width: WP('10'), 
        height: WP('10'),
        borderRadius: WP('100')
    }
})
export default Avatar;