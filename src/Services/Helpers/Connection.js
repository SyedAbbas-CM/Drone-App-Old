//import liraries
import NetInfo from '@react-native-community/netinfo'

// create a component
export const isConnected = (success, reject) => {
  NetInfo.fetch().then(state => {
    console.log('showing states for connection ', state)
    if (state.isConnected) {
      success(true)
    } else {
      reject(false)
    }
  })
}
