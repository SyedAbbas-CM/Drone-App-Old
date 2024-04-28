import NetInfo from '@react-native-community/netinfo'
import { launchCamera } from 'react-native-image-picker'
import SnackBarManager from '../utils/snackBarManager'
export const isNetworkConnected = () => {
  return NetInfo.fetch()
}
export const showSnackBar = (type, message) => {
  let Snackbar = SnackBarManager.getSnackBar()
  setTimeout(() => {
    Snackbar.alertWithType(type, '', message, 1000)
  }, 100)
}

export const getCameraPicture = (success, reject) => {
  const options = {
    quality: 0.1,
    maxWidth: 700,
    maxHeight: 700,
    includeBase64: true,
    storageOptions: {
      skipBackup: true,
    },
  }
  launchCamera(options, response => {
    if (response.didCancel) {
      console.log('User cancelled photo picker')
      reject()
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error)
      reject()
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton)
    } else {
      let source = response.assets
      console.log('Response from launch Camera', source)
      // You can also display the image using data:
      // let source = { uri: 'data:image/jpeg;base64,' + response.data };
      success(source)
    }
  })
}

// export const getPicture = (success, reject) => {
//   const options = {
//     quality: 0.1,
//     maxWidth: 700,
//     maxHeight: 700,
//     includeBase64: true,
//     storageOptions: {
//       skipBackup: true,
//     },
//   }
//   launchImageLibrary(options, response => {
//     if (response.didCancel) {
//       console.log('User cancelled photo picker')
//       reject()
//     } else if (response.error) {
//       console.log('ImagePicker Error: ', response.error)
//       reject()
//     } else if (response.customButton) {
//       console.log('User tapped custom button: ', response.customButton)
//     } else {
//       let source = response.assets
//       console.log('Response from Library Camera', source)
//       // You can also display the image using data:
//       // let source = { uri: 'data:image/jpeg;base64,' + response.data };
//       success(source)
//     }
//   })
// }

// export const capitalizeFirstLetter = string => {
//   return string.charAt(0).toUpperCase() + string.slice(1)
// }
