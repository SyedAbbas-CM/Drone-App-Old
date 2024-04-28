import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import { useTheme } from '@/Hooks'
import Icon from 'react-native-vector-icons/Ionicons'
import { WP } from '@/Theme/Responsive'
import { goBack } from '@/Navigators/utils'
import { useTranslation } from 'react-i18next'
import { Colors } from '@/Theme/Variables';



const ProfileHeader = (props) => {
    const { t } = useTranslation()
    const { Layout, Images, Colors } = useTheme()
    const { name, rating, totalTrips, years } = props

    return (
        <View>
            <View style={Layout.profileHeader}>
                <View style={styles.iconsArrange}>
                    <TouchableOpacity onPress={() => goBack()} style={Layout.backButtonWhite}>
                        <Icon name="close-outline" size={30} color={Colors.white} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={props.onEditPress} style={Layout.editButton}>
                        <Icon name="help-circle-outline" size={18} color={Colors.white} />
                        <Text style={{ color: Colors.white, fontSize: WP('3.5') }}>Help</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.logosArrange}>
                    <View>
                        <TouchableOpacity style={styles.iconContainer} onPress={props.onPressEarning}>
                        <Image source={Images.earnings} style={styles.iconImage}/>
                        </TouchableOpacity>
                        <Text style={styles.textProfile}>Earnings</Text>
                    </View>
                    <View style={{marginBottom: WP('10')}}>
                        <View style={styles.imageContainer}>
                            <Image style={styles.imageProfile} source={Images.avatar} />
                            <View style={styles.ratingContainer}>
                                <Icon name="star-sharp" size={12} color={Colors.black} />
                                <Text>{rating}</Text>
                            </View>
                        </View>
                        <Text style={styles.textProfile}>{name}</Text>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.iconContainer}>
                        <Image source={Images.wallet} style={styles.iconImage}/>
                        </TouchableOpacity>
                        <Text style={styles.textProfile}>Wallet</Text>
                    </View>
                </View>
            </View>

            {/* <View style={Layout.divider}></View> */}
            {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={Layout.boxContainer}>
            <Text style={Layout.textNumbers}>{totalTrips}</Text>
            <Text style={Layout.text}>{t("trips")}</Text>
        </View>
        <View style={Layout.dividerVertical}></View>
        <View style={Layout.boxContainer}>
        <Text style={Layout.textNumbers}>{years}</Text>
            <Text style={Layout.text}>{t("years")}</Text>
        </View>
      </View> */}
        </View>

    );
}

const styles = StyleSheet.create({
    iconsArrange: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    logosArrange: {
        marginTop:WP('6'),
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: WP('15'),
        height: WP('15'),
        backgroundColor: '#424A5F',
        borderRadius: WP('100')
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: WP('25'), 
        height: WP('25'),
        borderColor: '#ffffff',
        borderWidth: WP('0.2'),
        borderRadius: WP('100')
    },
    ratingContainer: {
        justifyContent:'center',
        alignItems: 'center',
        position: 'absolute',
        top: WP('20'),
        width: WP('12'),
        height:WP('5'),
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderRadius: WP('0.5'), 
    },
    imageProfile: {
        width: WP('25'), 
        height: WP('25'),
        borderRadius: WP('100')
    },
    textProfile: {
        marginTop:WP('1'),
        fontSize: WP('4'),
        textAlign: 'center',
        color: Colors.white,
    },
    iconImage: {
        width: WP('10'), 
        height: WP('10'), 
        tintColor: 'white'
    }
})


export default ProfileHeader;