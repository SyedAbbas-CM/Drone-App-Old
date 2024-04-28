import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import { useTheme } from '@/Hooks'
import Icon from 'react-native-vector-icons/Ionicons'
import { WP } from '../Theme/Responsive'
import { goBack } from '../Navigators/utils'
import { useTranslation } from 'react-i18next'
import { Colors } from '../Theme/Variables';

const VeroProfileHeader = (props) => {
    const { t } = useTranslation()
    const { Layout, Images, Colors } = useTheme()
    const { name, rating, totalTrips, years } = props

  return (
      <View>
      <View style={styles.profileHeader}>
        <TouchableOpacity onPress={() => goBack()} style={Layout.backButtonWhite}>
            <Icon name="arrow-back" size={25} color={Colors.white}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={props.onEditPress} style={styles.editButton}>
            <Icon name="pencil" size={20} color={Colors.white}/>
        </TouchableOpacity>
      </View>
      <View style={styles.whiteContainer}>
      <View style={styles.imageContainer}>
        <Image style={Layout.imageProfile} source=
        {props?.picture ? {uri:props?.picture?.uri } : Images.avatar} />
        <TouchableOpacity onPress={props?.onPressCamera} style={styles.ratingContainer}>
        <Icon name="camera" size={24} color={Colors.black}/>
        </TouchableOpacity>
        </View>
        <Text style={styles.textProfile}>{name}</Text>
        <View style={Layout.divider}></View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={Layout.boxContainer}>
            <Text style={Layout.textNumbers}>{totalTrips}</Text>
            <Text style={Layout.text}>{t("trips")}</Text>
        </View>
        <View style={Layout.dividerVertical}></View>
        <View style={Layout.boxContainer}>
        <Text style={Layout.textNumbers}>{years}</Text>
            <Text style={Layout.text}>{t("years")}</Text>
        </View>
        </View>
      </View>
      </View>

  );
}

const styles = StyleSheet.create({
    editButton: {
        position: 'absolute',
        marginTop:WP('5'),
        right: WP('6')
      },
      profileHeader:{ 
        flexDirection: 'row',
        height: WP('55'),
        backgroundColor: '#000000',
    },
    textProfile: {
        fontSize: WP('6'), 
        fontWeight: 'bold',
        color: Colors.black,
    },
    imageContainer: {
        marginTop: WP('-10'),
        alignItems: 'center',
        justifyContent: 'center',
        width: WP('20'), 
        height: WP('20'),
        borderColor: '#ffffff',
        borderWidth: WP('0.2'),
        borderRadius: WP('100')
    },
    ratingContainer: {
        justifyContent:'center',
        alignItems: 'center',
        position: 'absolute',
        top: WP('14'),
        right: WP('2'),
        width: WP('5'),
        height:WP('5'),
        flexDirection: 'row',
        backgroundColor: 'transparent',
    },
    whiteContainer: {
        position: 'absolute',
        alignItems: 'center',
        top: WP('30'),
        width: WP('94'),
        height: WP('48'),
        borderRadius: WP('3'),
        alignSelf: 'center',
        backgroundColor: '#ffffff'
  
    },
})


export default VeroProfileHeader;