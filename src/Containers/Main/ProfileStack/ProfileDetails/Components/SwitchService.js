import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { WP } from '@/Theme/Responsive';
import { useTranslation } from 'react-i18next'
import { Colors } from '@/Theme/Variables';

const SwitchService = ({onPress}) => {
    const { t } = useTranslation()

  return (
    <TouchableOpacity style={styles.conatiner} onPress={onPress}>
    <Ionicon name='ios-car' size={35} color={Colors.black}/>
        <View>
        <Text style={styles.textBold}>{t('serviceSwitch')}</Text>
        <Text style={styles.text}>{t('serviceChange')}</Text>
        </View>
        <View style={{paddingLeft: WP('25')}}>
        <Ionicon name='chevron-forward' size={18} color={Colors.darkGrey}/>
        </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    conatiner: {
        alignItems:'center',
        padding: WP('1.5'),
        paddingLeft: WP('6'),
        flexDirection:'row',
        marginBottom: WP('3'),
        marginTop: WP('3')
    },
    textBold: {
        paddingLeft: WP('4'),
        fontWeight: 'bold',
        fontSize: WP('4.8'),
        color: Colors.black,
    },
    text: {
        marginTop: WP('1'),
        paddingLeft: WP('4'),
        fontSize: WP('3.5'),
        color: Colors.darkGrey
    }
})

export default SwitchService;