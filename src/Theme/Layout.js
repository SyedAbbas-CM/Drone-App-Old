import { StyleSheet } from 'react-native'
import { WP } from './Responsive'
import { Colors } from './Variables'


/**
 *
 * @param Theme can be spread like {Colors, NavigationColors, Gutters, Layout, Common, ...args}
 * @return {*}
 */
export default function () {
  return StyleSheet.create({
    /* Column Layouts */
    column: {
      flexDirection: 'column',
    },
    columnReverse: {
      flexDirection: 'column-reverse',
    },
    colCenter: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    colVCenter: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    colHCenter: {
      flexDirection: 'column',
      justifyContent: 'center',
    },
    /* Row Layouts */
    row: {
      flexDirection: 'row',
    },
    rowReverse: {
      flexDirection: 'row-reverse',
    },
    rowCenter: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    rowVCenter: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    rowHCenter: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    /* Default Layouts */
    center: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    alignItemsCenter: {
      alignItems: 'center',
    },
    alignItemsStart: {
      alignItems: 'flex-start',
    },
    alignItemsStretch: {
      alignItems: 'stretch',
    },
    justifyContentCenter: {
      justifyContent: 'center',
    },
    justifyContentAround: {
      justifyContent: 'space-around',
    },
    justifyContentBetween: {
      justifyContent: 'space-between',
    },
    scrollSpaceAround: {
      flexGrow: 1,
      justifyContent: 'space-around',
    },
    scrollSpaceBetween: {
      flexGrow: 1,
      justifyContent: 'space-between',
    },
    selfStretch: {
      alignSelf: 'stretch',
    },
    /* Sizes Layouts */
    fill: {
      flex: 1,
    },
    fullSize: {
      height: '100%',
      width: '100%',
    },
    fullWidth: {
      width: '100%',
    },
    fullHeight: {
      height: '100%',
    },
    /* Operation Layout */
    mirror: {
      transform: [{ scaleX: -1 }],
    },
    rotate90: {
      transform: [{ rotate: '90deg' }],
    },
    rotate90Inverse: {
      transform: [{ rotate: '-90deg' }],
    },
    veroButton:{
      alignItems: 'center',
      justifyContent: 'center',
      width: WP('87'),
      backgroundColor: Colors.orange,
      height: WP('11'),
      borderRadius: WP('7'),
      alignSelf: 'center',
      marginTop: WP('3'),
      marginBottom: WP('1'),
    },
    veroRequestButton: {
      alignItems: 'center',
      justifyContent: 'center',
      width: WP('80'),
      backgroundColor: Colors.green,
      height: WP('11'),
      borderRadius: WP('7'),
      alignSelf: 'center',
      marginTop: WP('3'),
      marginBottom: WP('1'),
    },
    buttonText: {
      fontSize: WP('4'),
      color: Colors.white,
    },
    textInputMask: {
      width: WP('85'),
      color: '#000000',
      alignSelf: 'center',
      height: WP('14'),
      marginBottom: WP('2'),
      marginTop: WP('4'),
      borderBottomWidth: 0.7,
      borderColor: Colors.grey,
      fontSize: WP('3.7'),
      borderRadius: WP('0.8'),
      paddingLeft: WP('3'),
      paddingRight: WP('3'),
    },
    textInput: {
      color: '#000000',
      width: WP('88'),
      alignSelf: 'center',
      height: WP('14'),
      marginBottom: WP('3'),
      marginTop: WP('3'),
      borderBottomWidth: 0.7,
      borderColor: Colors.grey,
      fontSize: WP('3.7'),
      borderRadius: WP('0.8'),
      paddingLeft: WP('3'),
      paddingRight: WP('3'),
    },
    textInputHeader: {
      width: WP('85'),
      color: '#000000',
      alignSelf: 'center',
      height: WP('10'),
      // marginBottom: WP('3'),
      // marginTop: WP('3'),
      borderBottomWidth: 0.7,
      borderColor: Colors.grey,
      fontSize: WP('3.7'),
      borderRadius: WP('0.8'),
      paddingLeft: WP('3'),
      paddingRight: WP('3'),
    },
    headerText: {
      marginLeft: WP('7'),
      fontSize: WP('7'),
      fontWeight: 'bold',
      marginBottom: WP('1'),
      color: Colors.black,
      marginTop: WP('5')
    },
    subHeaderText: {
      marginLeft: WP('7'),
      fontSize: WP('4'),
      color: Colors.grey,
      marginBottom: WP('5'),
    },
    underLineText: {
      fontSize: WP('3.5'),
      color: Colors.orange,
      textAlign: 'center',
      fontWeight: 'bold',
      marginTop: WP('4'),
    },
    subHeaderPhone: {
      marginLeft: WP('7'),
      fontSize: WP('4'),
      color: Colors.darkGrey,
      marginBottom: WP('5'),
    },
    headerTitle: {
      justifyContent: 'center',
      alignItems: 'center',
      width: WP('70')
      // marginLeft: WP('20'),
    },
    headerTitleText:{
      fontSize: WP('5'),
      fontWeight: 'bold',
      color: Colors.black,
    },
    verficationInputContainer: {
      alignSelf: 'flex-start',
      marginBottom: WP('15')

    },
    verficationInput: {
      width: WP('14'),
      height: WP('7'),
      marginLeft: WP('8'),
      marginTop: WP('4'),
      backgroundColor: Colors.white,
      fontSize: WP('5'),
    },
    backButton: { 
      marginTop:WP('5'),
      marginBottom:WP('5'),
      marginLeft: WP('6') 
    },
    headerBackButton: {
      position: 'absolute',
      top: WP('3'),
      // marginTop:WP('3'),
      // marginBottom:WP('5'),
      left: WP('6') 
    },
    backButtonWhite: {
      marginTop:WP('5'),
      left: WP('6') 
    },
    editButton: {
      flexDirection: 'row',
      marginTop:WP('5'),
      right: WP('6')
    },
    mobileInputContainer: {
      flex: 1,
      backgroundColor: Colors.white,
    },
    privacyText: {
      marginLeft: WP('10'),
      marginRight: WP('10'),
      fontSize: WP('3'),
      textAlign: 'center',
      color: Colors.grey,
      marginBottom: WP('5')
    },
    privacyTextBold: {
      fontSize: WP('3'),
      color: Colors.darkGrey
    },
    logo: {
      resizeMode: 'contain',
      height: WP('40'),
      width: WP('40'),
      alignSelf: 'center',
      marginTop:WP('15'),
      marginBottom: WP('95%')    
    },
    innerContainer: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0, 0.60)'
    },
    profileHeader:{ 
      height: WP('55'),
      backgroundColor: '#000000',
  },
  whiteContainer: {
      position: 'absolute',
      alignItems: 'center',
      top: WP('30'),
      width: WP('94'),
      height: WP('50'),
      borderRadius: WP('3'),
      alignSelf: 'center',
      backgroundColor: '#ffffff'

  },
  imageContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      width: WP('20'), 
      height: WP('20'),
      borderColor: '#ffffff',
      borderWidth: WP('0.2'),
      borderRadius: WP('100')
  },
  imageProfile: {
      width: WP('20'), 
      height: WP('20'),
      borderRadius: WP('100')
  },
  ratingContainer: {
      justifyContent:'center',
      alignItems: 'center',
      position: 'absolute',
      top: WP('16'),
      width: WP('12'),
      height:WP('5'),
      flexDirection: 'row',
      backgroundColor: '#ffffff',
      borderRadius: WP('0.5'), 

  },
  textProfile: {
      fontSize: WP('6'), 
      fontWeight: 'bold',
      color: Colors.white,

  },
  text: {
    fontSize: WP('4'), 
    color: Colors.grey,
    fontWeight: 'bold'
},
textNumbers: {
  fontSize: WP('4.3'), 
  color: Colors.black,
  fontWeight: 'bold'
},
  divider: {
      borderWidth: WP(0.1),
      marginTop: WP('10'),
      width: WP('94'),
      borderColor: 'grey'
  },
  dividerVertical: {
      borderWidth: WP(0.1),
      height: WP('18'),
      borderColor: 'grey'
  },
  boxContainer: {
      width: WP('45'),
      justifyContent: 'center',
      alignItems: 'center'
  },
  headerContainer: {
    width:WP('100'),
    height: WP('12'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    flexDirection: 'row',
},
  requestHeader: {
    marginTop: WP('1'),
      width:WP('100'),
      height: WP('60'),
      backgroundColor: Colors.white,
  },
  helpText: {
    fontSize: WP('4.5'),
    fontWeight: 'bold',
    color: Colors.black,
    marginTop: WP('6'),
    marginLeft: WP('6')
  },
  switchServiceContainer: {
    backgroundColor: Colors.white, 
    flex: 1, 
    marginTop: WP('1.5')
  },
  helpText2: {
    fontSize: WP('4.5'),
    fontWeight: 'bold',
    color: Colors.black,
    marginTop: WP('30'),
    marginLeft: WP('6')
  },
  requestHeaderText: {
    color: Colors.grey,
    marginTop: WP('1'),
    fontSize: WP('4'),
    marginLeft: WP('8')
  },
  bottomHeader: {
      // marginTop: WP('1'),
      width:WP('100'),
      height: WP('40'),
      backgroundColor: Colors.white,
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    // justifyContent: 'flex-end',
    // alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  })
}
