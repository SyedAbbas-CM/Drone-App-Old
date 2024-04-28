import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  PermissionsAndroid,
  Platform,
  Image,
} from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import { VeroGoButton, VeroBottomSheet, VeroLoader } from '@/Components'
import Earnings from './Components/Earnings'
import GasStationButton from './Components/GasStationButton'
import Avatar from './Components/Avatar'
import { useTheme } from '@/Hooks'
import { navigate } from '@/Navigators/utils'
import Geolocation from 'react-native-geolocation-service'
import { APIRequest } from '@/Services/ApiRequest'
import { Config } from '@/Config'
import { showSnackBar } from '@/Services/Helpers/index'
import { useDispatch, useSelector } from 'react-redux'
import { setPurchaseID, setActiveStatus } from '@/Store/Actions/user'
import axios from 'axios'
import { WP } from '@/Theme/Responsive'

const MapScreen = () => {
  const user = useSelector(state => state.user.user)
  const activeStatus = useSelector(state => state.user.activeStatus)
  const purchase_id = useSelector(state => state.user.purchase_id)
  const appState = useSelector(state => state.user.appState)

  console.log('Active Status', purchase_id)

  const user_id = useSelector(state => state.user.user_id)
  const { width, height } = Dimensions.get('screen')
  const [loading, setLoading] = useState(false)
  const [driverLocation, setDriverLocation] = useState()
  const [offline, setOffline] = useState(false)
  const [gasStationMarker, setGasStationMarker] = useState()
  const LATITUDE_DELTA = 0.02
  const ASPECT_RATIO = width / height
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO
  const dispatch = useDispatch()

  let gasArray = new Array()
  let gasMarkers = new Array()

  // useEffect(() => {
  //   console.log("App state in startup", appState)
  //   // if (user) {
  //     if(appState){
  //       if(appState == Config.AppStateEnum.RIDE_ACCEPTED){
  //         // console.log("in first", appState, Config.AppStateEnum.RIDE_ACCEPTED),
  //         ()=> navigate("RideScreen")
  //       } else if(appState == Config.AppStateEnum.RIDE_STARTED) {
  //         // console.log("in second", appState, Config.AppStateEnum.RIDE_STARTED),
  //         ()=> navigate("RideToDestination")
  //       } else if(appState == Config.AppStateEnum.RIDE_ARRIVED) {
  //         // console.log("in 3rd", appState, Config.AppStateEnum.RIDE_ARRIVED),
  //         ()=> navigate("RideToPickup")
  //       }
  //     }
  // }, [])

  useEffect(async () => {
    console.log('user here is ', user)
    await getLocationAsync()
    console.log('useEffect called!')
    if (activeStatus == true) {
      console.log(
        'Active statusss in useeffedcttt',
        activeStatus,
        ' and off is ',
        offline,
      )
      setOffline(true)
    } else {
      setOffline(false)
    }
  }, [])

  useEffect(() => {
    if (driverLocation) {
      console.log('Driver Location is fetched', driverLocation)
      updateDriverLocation()
    } else {
      console.log('Driver Location is not fetched yet', driverLocation)
    }
  }, [driverLocation?.longitude])

  const updateDriverLocation = () => {
    let params = {
      user_id: user_id,
      coordinates: [driverLocation?.latitude, driverLocation?.longitude],
    }
    setLoading(true)
    new APIRequest.Builder()
      .post()
      .reqURL(Config.END_POINTS.UPDATE_DRIVER_LOCATION)
      .jsonParams(params)
      .response(response => {
        console.log('Response ', response)
        setLoading(false)
      })
      .error(error => {
        console.log('Showing error', error)
        setLoading(false)
      })
      .build()
      .doRequest()
  }

  const isOnline = () => {
    let status
    if (offline == false) {
      status = true
      setOffline(true)
    } else {
      status = false
      setOffline(false)
    }
    let params = {
      is_online: status,
      has_ride_pool: 'true',
      user_type: 'driver',
    }
    setLoading(true)
    new APIRequest.Builder()
      .put()
      .reqURL(Config.END_POINTS.USERS)
      .jsonParams(params)
      .response(response => {
        // console.log("Response ", response)
        if (response?.data?.data?.is_online == true) {
          showSnackBar(Config.SnackBarEnum.SUCCESS, 'You are Online!')
          dispatch(setActiveStatus(true))
        } else if (response?.data?.data?.is_online == false) {
          showSnackBar(Config.SnackBarEnum.ERROR, 'You are Offline!')
          dispatch(setActiveStatus(false))
        }
        setLoading(false)
      })
      .error(error => {
        console.log('Showing error', error)
        setLoading(false)
      })
      .build()
      .doRequest()
  }

  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const granted = await Geolocation.requestAuthorization('whenInUse')
      console.log('iOs permission, ', granted)
      if (granted) {
        return true
      } else {
        return false
      }
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Driver App Location Permission',
            message:
              'Driver App needs access to your location, ' +
              'so you can view near by ride.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Permission granted')
          return true
        } else {
          console.log('Permission denied')
          return false
        }
      } catch (err) {
        console.warn(err)
      }
    }
  }

  const getLocationAsync = async () => {
    const granted = await requestLocationPermission()
    if (granted) {
      Geolocation.getCurrentPosition(
        position => {
          console.log(position)
          setDriverLocation({
            longitude: position?.coords?.longitude,
            latitude: position?.coords?.latitude,
          })
        },
        error => {
          // See error code charts below.
          console.log(error?.code, error?.message)
          alert('Location Not found!')
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      )
    }
  }

  const getGasStations = () => {
    axios({
      method: 'get',
      url:
        'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' +
        driverLocation?.latitude +
        ',' +
        driverLocation?.longitude +
        '&radius=5000&type=gas_station&key=AIzaSyAAB7FFI7kfgYE97wOqnP_CxCDzWkXtV_w',
    })
      .then(function (response) {
        console.log('Response of Places Nearby', response)
        gasArray = response?.data?.results
        findFinalGasArray()
      })
      .catch(function (error) {
        console.log('Error of Places Nearby', error)
      })
  }

  const findFinalGasArray = async () => {
    await gasArray?.map(item => {
      let arr = {
        longitude: item?.geometry?.location?.lng,
        latitude: item?.geometry?.location?.lat,
        icon: item?.icon,
      }
      gasMarkers.push(arr)
    })
    setGasStationMarker(gasMarkers)
    console.log('Final aray', gasMarkers)
  }

  const { Layout, Images } = useTheme()
  return (
    <View style={Layout.mapContainer}>
      {gasMarkers.map((item, index) => {
        console.log('Items ', item)
      })}
      {driverLocation && (
        <MapView
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          showsMyLocationButton={false}
          zoomControlEnabled={false}
          zoomEnabled={true}
          zoomTapEnabled={true}
          style={Layout.map}
          //   region={{
          //   latitude: 37.78825,
          //   longitude: -122.4324,
          //   latitudeDelta: 0.0922,
          //   longitudeDelta: 0.0421,
          // }}
          region={{
            latitude: driverLocation?.latitude,
            longitude: driverLocation?.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
        >
          {console.log('Station', gasStationMarker)}
          {gasStationMarker &&
            gasStationMarker.map((item, index) => (
              <Marker
                key={index}
                stopPropagation={true}
                coordinate={{
                  latitude: parseFloat(item.latitude),
                  longitude: parseFloat(item.longitude),
                }}
              >
                <Image
                  source={{ uri: item?.icon }}
                  style={{ width: WP('5'), height: WP('5') }}
                />
              </Marker>
            ))}
        </MapView>
      )}

      <View style={[Layout.rowCenter, Layout.justifyContentBetween]}>
        <GasStationButton
          onGassPress={
            () => console.warn('No gas stations nearby')
            // navigate("ChatScreen")
          }
        />
        <Earnings />
        <Avatar onPressAvatar={() => navigate('ProfileStack')} />
      </View>
      <VeroGoButton isOnline={offline} onPressGo={isOnline} />
      {/* <VeroBottomSheet/> */}
      {loading && <VeroLoader />}
    </View>
  )
}

export default MapScreen
