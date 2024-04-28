import React, { useState, useEffect, useRef } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  PermissionsAndroid,
  Platform,
  DeviceEventEmitter,
} from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { VeroBottomSheet, VeroGoButton } from '@/Components'
import Icon from 'react-native-vector-icons/FontAwesome'
import { navigate } from '@/Navigators/utils'
import axios from 'axios'
import Geolocation from 'react-native-geolocation-service'
import { APIRequest } from '@/Services/ApiRequest'
import { Config } from '@/Config'
import { Colors } from '@/Theme/Variables'
import MapViewDirections from 'react-native-maps-directions'
import { useDispatch, useSelector } from 'react-redux'
import { VeroHeader, VeroLoader } from '../../../Components'
import TopHeader from './Components/TopHeader'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/Hooks'
import { firebase } from '@/Services/FirebaseConfig'
import FullScreenHeader from './Components/FullScreenHeader'
import TopHeaderFood from './Components/TopHeaderFood'
import FoodItemModal from './Components/FoodItemsModal'
import TopHeaderPurchase from './Components/TopHeaderPurchase'
import ItemsPurchaseModal from './Components/ItemsPurchaseModal'
import TopHeaderPickup from './Components/TopHeaderPickup'
import TopHeaderExchange from './Components/TopHeaderExchange'
import PackagePickupModal from './Components/PackagePickupModal'
import ExchangeReturnModal from './Components/ExchangeReturnModal'
import { setAppState, setStartTime } from '../../../Store/Actions'

// import database from '@react-native-firebase/database';

const db = firebase.database()

const RideScreen = props => {
  const mapRef = useRef(null)
  const markerRef = useRef(null)
  const ride = useSelector(state => state.user.rideDetails)
  const ItemDetails = useSelector(state => state.user.itemDetails)
  const purchase_id = useSelector(state => state.user.purchase_id)
  const { name, pickup, service, status, pickupLocation, dropLocation } = ride
  console.log('Ride detail here are', ride)
  const { Layout, Images } = useTheme()
  const GOOGLE_MAPS_APIKEY = 'AIzaSyC6Vo_6ohnkLyGIw2IPmZka0TarRaeWJ2g'
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const [headers, setHeaders] = useState(true)
  const [serviceType, setServiceType] = useState()
  const [pickupFrom, setPickupFrom] = useState()
  const [passenger, setPassenger] = useState()
  const [statusIs, setStatusIs] = useState()
  const [pickupCoordinates, setpickupCoordinates] = useState()
  const [dropCoordinates, setDropCoordinates] = useState()
  const [coordinates, setCoordinates] = useState([])
  const [region, setRegion] = useState()
  const [ready, setReady] = useState(true)
  const [tripStarted, setTripStarted] = useState(false)
  const [newState, setNewState] = useState()
  const [prevAngle, setPrevAngle] = useState()
  const [prevLatitude, setPrevLatitude] = useState()
  const [prevLongitude, setPrevLongitude] = useState()
  const [dLatitude, setDLatitude] = useState()
  const [distance, setDistance] = useState()
  const [time, setTime] = useState()
  const [place, setPlace] = useState()
  const [followDriver, setFollowDriver] = useState(true)
  const [mapMove, setMapMove] = useState(true)
  const [newAngle, setNewAngle] = useState()
  const [degreeString, setDegreeString] = useState()
  const [dLongitude, setDLongitude] = useState()
  const [purchasesChildKey, setPurchasesChildKey] = useState()
  const [locationChildKey, setLocationChildKey] = useState()
  const [locationSubChildKey, setLocationSubChildKey] = useState()
  const [customerDropLocation, setCustomerDropLocation] = useState()
  const [modalVisible, setModalVisible] = useState(false)
  const [itemModalVisible, setItemModalVisible] = useState(false)
  const [packageModalVisible, setPackageModalVisible] = useState(false)
  const [itemsData, setItemsData] = useState([])
  const [exchangeModalVisible, setExchangeModalVisible] = useState(false)
  const [startCoordinate, setStartCoordinates] = useState()
  const dispatch = useDispatch()

  const { width, height } = Dimensions.get('screen')

  const [driverLocation, setDriverLocation] = useState({
    latitude: 31.465583,
    longitude: 74.279185,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  })

  const LATITUDE_DELTA = 0.02
  const ASPECT_RATIO = width / height
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

  useEffect(() => {
    setServiceType(service && service),
      setPickupFrom(pickup && pickup),
      setPassenger(name && name),
      setStatusIs(status && status),
      setpickupCoordinates(pickupLocation && pickupLocation),
      setDropCoordinates(dropLocation && dropLocation)
  }, [])
  useEffect(() => {
    if (service) {
      Geolocation.getCurrentPosition(
        position => {
          // console.log('position watching in Ride Screen', pickupLocation[0].latitude)
          setCoordinates([
            {
              latitude: pickupLocation[0]?.latitude,
              longitude: pickupLocation[0]?.longitude,
            },
            {
              latitude: position?.coords?.latitude,
              longitude: position?.coords?.longitude,
            },
          ])
          setDegreeString(position?.coords?.heading)
          setRegion({
            latitude: position?.coords?.latitude,
            longitude: position?.coords?.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          })
          setStartCoordinates({
            latitude: position?.coords?.latitude,
            longitude: position?.coords?.longitude,
          })
        },
        error => {
          // See error code charts below.
          console.log(error?.code, error?.message)
          alert('Location Not found!')
        },
        { enableHighAccuracy: true, timeout: 4500, interval: 800 },
      )
    }
    console.log('useEffect called! in end')
  }, [service])
  const onMapReady = e => {
    if (!ready) {
      setReady(true)
    }
  }

  const databaseConnect = async () => {
    let purchasesChildKey = ''
    let locationChildKey = ''
    let locationSubChildKey = ''
    let customerDropLocation = ''
    await db
      .ref()
      .child('purchases')
      .once('value', snapshot => {
        snapshot.forEach(childSnapshot => {
          // const childKey = childSnapshot.key;
          // console.log('purchasesChildKey: ', childSnapshot.key);
          if (childSnapshot.val().purchase_id == purchase_id) {
            // console.log('purchasesChildKey inside if: ', childSnapshot.key);
            customerDropLocation = childSnapshot.val().drop_of_location
          }
        })
      })

    await db
      .ref()
      .child('purchases')
      .once('value', snapshot => {
        snapshot.forEach(childSnapshot => {
          // const childKey = childSnapshot.key;
          // console.log('purchasesChildKey: ', childSnapshot.key);
          if (childSnapshot.val().purchase_id == purchase_id) {
            // console.log('purchasesChildKey inside if: ', childSnapshot.key);
            purchasesChildKey = childSnapshot.key
          }
        })
      })

    await db
      .ref()
      .child('purchases_location')
      .once('value', snapshot => {
        snapshot.forEach(childSnapshot => {
          // const childKey = childSnapshot.key;
          // console.log('locationChildKek: ', childSnapshot.key);
          if (childSnapshot.key == purchasesChildKey) {
            // console.log('location Child Key inside if: ', childSnapshot.key);
            locationChildKey = childSnapshot.key
          }
        })
      })
    console.log('purchasesChildKey: ', purchasesChildKey)
    console.log('locationChildKey: ', locationChildKey)

    // if (purchasesChildKey == locationChildKey) {
    //   await db
    //     .ref()
    //     .child('purchases_location')
    //     .child(locationChildKey)
    //     .once('value', (snapshot) => {
    //       snapshot.forEach((childSnapshot) => {
    //         // const childKey = childSnapshot.key;
    //         // console.log('locationsubChildKey: ', childSnapshot.key);
    //         if (childSnapshot.key) {
    //           //   const childVal = childSnapshot.val();
    //           //   console.log('location sub Child Key inside if: ', childVal);
    //           locationSubChildKey = childSnapshot.key;
    //         }
    //       });
    //     });
    //   console.log('locationSubChildKey: ', locationSubChildKey);
    //     // setPurchasesChildKey(purchasesChildKey)
    //     // setLocationChildKey(locationChildKey)
    //     // setLocationSubChildKey(locationSubChildKey)
    //     // setCustomerDropLocation(customerDropLocation)
    //   }
    setPurchasesChildKey(purchasesChildKey)
    setLocationChildKey(locationChildKey)
    // setLocationSubChildKey(locationSubChildKey)
    setCustomerDropLocation(customerDropLocation)
  }
  //===>> It works here..

  // useEffect(()=> {
  //     updateMap()
  // }, [7000])

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('Logs every minute')
      updateMap()
    }, 7000)
    return () => clearInterval(interval) // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  })

  const updateMap = async () => {
    console.log('control in update map')

    setPrevAngle(newAngle)
    DeviceEventEmitter.addListener('headingUpdated', data => {
      checkAngle = data
    })
    if (!locationChildKey) {
      await databaseConnect()
    }
    Geolocation.getCurrentPosition(
      position => {
        console.log('position for firebase: ', position)
        // this.setState({
        setDLatitude(position?.coords?.latitude),
          setDLongitude(position?.coords?.longitude),
          setCoordinates([
            {
              latitude: pickupLocation[0]?.latitude,
              longitude: pickupLocation[0]?.longitude,
            },
            {
              latitude: position?.coords?.latitude,
              longitude: position?.coords?.longitude,
            },
          ])
        const duration = 500
        const newCoordinate = {
          latitude: position?.coords?.latitude,
          longitude: position?.coords?.longitude,
        }
        if (navigate) {
          const curRot = getRotation(startCoordinate, newCoordinate)
        }
        if (followDriver == true && mapMove == true) {
          const region = {
            latitude: position?.coords?.latitude,
            longitude: position?.coords?.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }
          setToRegion(region)
        }
        if (Platform.OS === 'android') {
          if (markerRef) {
            console.log('check null', newCoordinate, duration)
            markerRef?.current?.animateMarkerToCoordinate(
              newCoordinate,
              duration,
            )
          }
        } else {
        }
        setPrevLatitude(position?.coords?.latitude)
        setPrevLongitude(position?.coords?.longitude),
          setDegreeString(position?.coords?.heading),
          setNewAngle(position?.coords?.heading),
          calculateDistanceTime(
            position?.coords?.latitude,
            position?.coords?.longitude,
          )
      },
      error => {
        console.log(error?.code, error?.message)
      },
      { enableHighAccuracy: true, timeout: 4500, maximumAge: 0 },
    )
  }

  const getRotation = (prevPos, curPos) => {
    if (!prevPos) return 0
    const xDiff = curPos?.latitude - prevPos?.latitude
    const yDiff = curPos?.longitude - prevPos?.longitude
    return (Math.atan2(yDiff, xDiff) * 180.0) / Math.PI
  }

  const calculateDistanceTime = (latitude, longitude) => {
    if (locationChildKey) {
      // if(this.state.customerDropLocation.name)
      console.log(
        'LAT LONG IN calculate,',
        latitude,
        longitude,
        "pickup's",
        pickupLocation[0]?.latitude,
        pickupLocation[0]?.longitude,
      )

      const driverCoordsRefs = db
        .ref()
        .child('purchases_location')
        .child(locationChildKey)
      // .child(locationSubChildKey);
      const newDriverCoordsRef = driverCoordsRefs.push()
      newDriverCoordsRef.set({
        lat: latitude && latitude,
        long: longitude && longitude,
        message: 'recent coords',
        is_ride_accepted: true,
        is_ride_ended: false,
      })
    }
    axios({
      method: 'post',
      url:
        'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=' +
        latitude +
        ',%20' +
        longitude +
        '&destinations=' +
        pickupLocation[0]?.latitude +
        ',%20' +
        pickupLocation[0]?.longitude +
        '&key=AIzaSyC6Vo_6ohnkLyGIw2IPmZka0TarRaeWJ2g',
    })
      .then(function (response) {
        console.log('maps.googleapis.com response: ', response?.data)
        // that.setState({
        setDistance(
          response?.data?.rows[0]?.elements[0]?.distance?.value *
            0.000621371192,
        )?.toFixed(2),
          setTime(
            response?.data?.rows[0]?.elements[0]?.duration?.value / 60,
          )?.toFixed(0)
        setPlace(response?.data?.destination_addresses)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const setToRegion = region => {
    if (ready) {
      setTimeout(() => {
        try {
          mapRef?.current?.animateToRegion(region)
        } catch (err) {
          console.log(err)
        }
      }, 10)
    }
    setFollowDriver(true)
  }
  const onRegionChange = region => {
    if (region?.latitudeDelta?.toFixed(4) != LATITUDE_DELTA?.toFixed(4)) {
      setFollowDriver(false)
    } else {
      setFollowDriver(true)
    }
  }
  const dragMap = () => {
    setMapMove(false)
  }

  const startTrip = () => {
    let startTime = new Date()
    let params = {
      purchase_id: purchase_id,
    }
    setLoading(true)
    new APIRequest.Builder()
      .post()
      .reqURL(Config.END_POINTS.START_RIDE)
      .jsonParams(params)
      .response(response => {
        console.log('Response ', response),
          dispatch(setAppState(Config.AppStateEnum.RIDE_STARTED))
        navigate('RideToDestination')
        dispatch(setStartTime(startTime))
        setLoading(false)
      })
      .error(error => {
        console.log('Showing error', error)
        setLoading(false)
      })
      .build()
      .doRequest()
  }

  return (
    <View style={Layout.fill}>
      {!headers && <FullScreenHeader onPress={() => setHeaders(true)} />}
      {headers && (
        <>
          <VeroHeader title="Ride to Pickup" />
          {serviceType == 'Food Delivery' ? (
            <TopHeaderFood
              onPressMessage={() => navigate('ChatScreen')}
              onPressCall={() => console.warn("You can't make call")}
              data={ItemDetails}
              onPressStart={startTrip}
              onPressItem={item => {
                setItemsData(item), console.log('Item is', item)
                setModalVisible(true)
              }}
              serviceType={serviceType}
              pickupFrom={pickupFrom}
              status={statusIs}
            />
          ) : serviceType == 'Item Purchase' ? (
            <TopHeaderPurchase
              onPressMessage={() => navigate('ChatScreen')}
              onPressCall={() => console.warn("You can't make call")}
              data={ItemDetails}
              onPressStart={startTrip}
              onPressItem={item => {
                setItemsData(item), console.log('Item is', item)
                setItemModalVisible(true)
              }}
              serviceType={serviceType}
              pickupFrom={pickupFrom}
              status={statusIs}
            />
          ) : serviceType == 'PackagePickup/Delivery' ? (
            <TopHeaderPickup
              onPressMessage={() => navigate('ChatScreen')}
              onPressCall={() => console.warn("You can't make call")}
              data={ItemDetails}
              onPressStart={startTrip}
              onPressItem={item => {
                setItemsData(item), console.log('Item is', item)
                setPackageModalVisible(true)
              }}
              serviceType={serviceType}
              pickupFrom={pickupFrom}
              status={statusIs}
            />
          ) : serviceType == 'Item Exchange' || serviceType == 'Item Return' ? (
            <TopHeaderExchange
              onPressMessage={() => navigate('ChatScreen')}
              onPressCall={() => console.warn("You can't make call")}
              data={ItemDetails}
              onPressStart={startTrip}
              onPressItem={item => {
                setItemsData(item)
                setExchangeModalVisible(true)
              }}
              serviceType={serviceType}
              pickupFrom={pickupFrom}
              status={statusIs}
            />
          ) : (
            <TopHeader
              onPressMessage={() => navigate('ChatScreen')}
              onPressCall={() => console.warn("You can't make call")}
              onPressStart={startTrip}
              name={passenger}
              serviceType={serviceType}
              pickupFrom={pickupFrom}
              status={statusIs}
            />
          )}
        </>
      )}
      <View style={Layout.fill}>
        {region && (
          <MapView
            provider={PROVIDER_GOOGLE}
            initialRegion={region}
            style={StyleSheet.absoluteFill}
            showsCompass={true}
            zoomControlEnabled={false}
            zoomEnabled={true}
            zoomTapEnabled={true}
            onPress={() => setHeaders(false)}
            onRegionChange={onRegionChange}
            onMapReady={onMapReady}
            ref={mapRef}
            onPanDrag={dragMap}
          >
            {console.log('Coordinates', coordinates[0])}
            {coordinates &&
              coordinates.map((coordinate, index) => (
                <MapView.Marker.Animated
                  key={`coordinate_${index}`}
                  onLoad={() => forceUpdate()}
                  coordinate={coordinates[0]}
                >
                  <Icon name="map-marker" size={30} color={Colors.black} />
                </MapView.Marker.Animated>
              ))}
            {console.log('start Coordinates', startCoordinate)}
            {startCoordinate && (
              <MapView.Marker.Animated
                coordinate={startCoordinate}
                onLoad={() => forceUpdate()}
                flat={true}
                ref={markerRef}
              >
                <Icon name="location-arrow" size={30} color={Colors.orange} />
              </MapView.Marker.Animated>
            )}
            {coordinates.length >= 2 && (
              <MapViewDirections
                origin={coordinates[1]}
                waypoints={
                  coordinates?.length > 2 ? coordinates.slice(1, -1) : []
                }
                destination={coordinates[0]}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={3}
                strokeColor="#000000"
                resetOnChange={false}
                mode="DRIVING"
                onStart={params => {
                  console.log(
                    `Started routing between "${params?.origin}" and "${params?.destination}"`,
                  )
                }}
                onError={errorMessage => {
                  console.log('GOT AN ERROR')
                }}
              />
            )}
          </MapView>
        )}
        <FoodItemModal
          onPressCross={() => setModalVisible(!modalVisible)}
          data={itemsData && itemsData}
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible)
          }}
        />
        <ItemsPurchaseModal
          onPressCross={() => setItemModalVisible(!itemModalVisible)}
          data={itemsData && itemsData}
          animationType="slide"
          transparent={true}
          visible={itemModalVisible}
          onRequestClose={() => {
            setItemModalVisible(!itemModalVisible)
          }}
        />
        <PackagePickupModal
          onPressCross={() => setPackageModalVisible(!packageModalVisible)}
          data={itemsData && itemsData}
          animationType="slide"
          transparent={true}
          visible={packageModalVisible}
          onRequestClose={() => {
            setPackageModalVisible(!packageModalVisible)
          }}
        />
        <ExchangeReturnModal
          onPressCross={() => setExchangeModalVisible(!exchangeModalVisible)}
          data={itemsData && itemsData}
          animationType="slide"
          transparent={true}
          visible={exchangeModalVisible}
          onRequestClose={() => {
            setExchangeModalVisible(!exchangeModalVisible)
          }}
        />
      </View>
      {loading && <VeroLoader />}
    </View>
  )
}

export default RideScreen
