// import React, { useCallback, useMemo, useRef } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
// import BottomSheet from '@gorhom/bottom-sheet';
// import { WP } from '@/Theme/Responsive';
// import { useTranslation } from 'react-i18next'
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
// import { Colors } from '@/Theme/Variables';
// import { useTheme } from '@/Hooks';

// const VeroBottomSheet = (props) => {
//     const { Layout, Colors, Fonts, Images } = useTheme()
//     const { t } = useTranslation()

//   const bottomSheetRef = useRef(null);
//   const snapPoints = useMemo(() => ['7%', '20%'], []);
//   const handleSheetChanges = useCallback(()=> {
//     console.log('handleSheetChanges')
//   })

//   // renders
//   return (
//     <View style={styles.container}>
//       <BottomSheet
//         ref={bottomSheetRef}
//         index={0}
//         snapPoints={snapPoints}
//         onChange={handleSheetChanges}
//       >
//         <View style={styles.contentContainer}>
//         {/* <TouchableOpacity onPress={() => alert("Let's go")} style={styles.buttonContainer}>
//         <Image source={Images.go} style={styles.goButton}/>
//         </TouchableOpacity> */}
//           <Text style={styles.sheetTitle}>{t("offline")}</Text>
//           <View style={styles.divider}></View>
//           <View style={Layout.row}>
//           <View style={styles.boxContainer}>
//           <Icon name="check-decagram" size={25} color={Colors.orange}/>
//             <Text style={Layout.textNumbers}>95.0%</Text> 
//             <Text style={Layout.text}>{t("acceptance")}</Text>
//         </View>
//         <View style={Layout.dividerVertical}></View>
//         <View style={styles.boxContainer}>
//         <Icon name="star-circle" size={25} color={Colors.orange}/>
//         <Text style={Layout.textNumbers}>4.66</Text>
//             <Text style={Layout.text}>{t("rating")}</Text>
//         </View>
//         <View style={Layout.dividerVertical}></View>
//         <View style={styles.boxContainer}>
//         <Icon name="close-box-outline" size={25} color={Colors.orange}/>
//         <Text style={Layout.textNumbers}>3.0%</Text>
//             <Text style={Layout.text}>{t("cancellation")}</Text>
//         </View>
//           </View>
//         </View>
//       </BottomSheet>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // height: WP('200'),
//     width: WP('100'),
//     // backgroundColor: 'grey',
//   },
//   contentContainer: {
//     flex: 1,
//   },
//   sheetTitle:{
//       fontSize: WP('4'),
//       fontWeight: 'bold',
//       color: Colors.black,
//       alignSelf: 'center'
//   },
//   divider: {
//     borderWidth: WP(0.1),
//     marginTop: WP('5'),
//     width: WP('100'),
//     borderColor: 'grey'
// },
// boxContainer: {
//     width: WP('33'),
//     justifyContent: 'center',
//     alignItems: 'center'
// }, 
// goButton: {
//     width: WP('20'),
//     height: WP('20'),
//     resizeMode: 'contain',
//     alignSelf: 'center',
//     tintColor: Colors.orange
// },
// buttonContainer: {
//     flex: 1,
//     position: 'relative',
//     bottom: WP('10'),

// }
// });

// export default VeroBottomSheet;