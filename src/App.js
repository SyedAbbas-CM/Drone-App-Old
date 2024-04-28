import 'react-native-gesture-handler'
import React, {useEffect} from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { store, persistor } from '@/Store'
import ApplicationNavigator from '@/Navigators/Application'
import './Translations'
import DropdownAlert from 'react-native-dropdownalert'
import SnackBarManager from './Services/utils/snackBarManager'
import { StyleSheet } from 'react-native'

const App = () => {

return(
  <>
  <Provider store={store}>
    {/**
     * PersistGate delays the rendering of the app's UI until the persisted state has been retrieved
     * and saved to redux.
     * The `loading` prop can be `null` or any react instance to show during loading (e.g. a splash screen),
     * for example `loading={<SplashScreen />}`.
     * @see https://github.com/rt2zz/redux-persist/blob/master/docs/PersistGate.md
     */}
    <PersistGate loading={null} persistor={persistor}>
      <ApplicationNavigator />
    </PersistGate>
  </Provider>
  <DropdownAlert
        ref={ref => SnackBarManager.setSnackBar(ref)}
        useNativeDriver={true}
        infoColor={'#0000'}
        titleStyle={{ flex: 0 }}
        messageStyle={styles.snackbarMessage}
        inactiveStatusBarStyle={'light-content'}
        inactiveStatusBarBackgroundColor={'#3198C3'}
        panResponderEnabled={false}
      />
  </>
)}

const styles = StyleSheet.create({
  snackbarMessage: {
    color: '#fff',
    marginVertical: 10,
  },
})


export default App
