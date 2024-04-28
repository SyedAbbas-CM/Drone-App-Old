import React, { useState, useEffect, useRef } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  PermissionsAndroid,
  Platform,
  DeviceEventEmitter,
  Alert,
} from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import {
  VeroBottomSheet,
  VeroGoButton,
  VeroLoader,
  VeroHeader,
} from '@/Components'
import Icon from 'react-native-vector-icons/FontAwesome'
import { navigate } from '@/Navigators/utils'
import axios from 'axios'
import Geolocation from 'react-native-geolocation-service'
import { APIRequest } from '@/Services/ApiRequest'
import { Config } from '@/Config'
import { Colors } from '@/Theme/Variables'
import MapViewDirections from 'react-native-maps-directions'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/Hooks'
import { firebase } from '@/Services/FirebaseConfig'
import FullScreenHeader from './Components/FullScreenHeader'
import { getCameraPicture } from '@/Services/Helpers'
import SignatureModal from './Components/SignatureModal'
import TopHeaderExchange from './Components/TopHeaderExchange'
import { setAppState } from '../../../Store/Actions'

// import database from '@react-native-firebase/database';

const db = firebase.database()
let imageUpload

const RideToPickup = props => {
  const mapRef = useRef(null)
  const markerRef = useRef(null)
  const ride = useSelector(state => state.user.rideDetails)
  const purchase_id = useSelector(state => state.user.purchase_id)
  const token = useSelector(state => state.user.token)

  const {
    name,
    pickup,
    service,
    status,
    pickupLocation,
    dropLocation,
    dropOff,
  } = ride
  console.log('Ride detail here are', ride)
  const { Layout, Images } = useTheme()
  const GOOGLE_MAPS_APIKEY = 'AIzaSyC6Vo_6ohnkLyGIw2IPmZka0TarRaeWJ2g'
  const { t } = useTranslation()
  const dispatch = useDispatch()
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
  const [pickedImage, setPickedImage] = useState()
  const [pickedImageDelivery, setPickedImageDelivery] = useState()
  const [startCoordinate, setStartCoordinates] = useState()
  const [amount, setAmount] = useState()
  const [modalVisible, setModalVisible] = useState(false)
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
    console.log('1st useEffect called!')
    setServiceType(service),
      setPickupFrom(pickup),
      setPassenger(name),
      setStatusIs(status),
      setpickupCoordinates(pickupLocation),
      setDropCoordinates(dropLocation)
  }, [])
  useEffect(() => {
    if (service) {
      console.log('2nd useEffect called!')
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
          ]),
            setDegreeString(position?.coords?.heading),
            setRegion({
              latitude: position?.coords?.latitude,
              longitude: position?.coords?.longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }),
            setStartCoordinates({
              latitude: position?.coords?.latitude,
              longitude: position?.coords?.longitude,
            }),
            console.log('useEffect called! in mid')
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
    //     setPurchasesChildKey(purchasesChildKey)
    //     setLocationChildKey(locationChildKey)
    //     setLocationSubChildKey(locationSubChildKey)
    //     setCustomerDropLocation(customerDropLocation)
    //   }
    setPurchasesChildKey(purchasesChildKey)
    setLocationChildKey(locationChildKey)
    // setLocationSubChildKey(locationSubChildKey)
    setCustomerDropLocation(customerDropLocation)
  }

  // useEffect(()=> {
  //   setInterval(()=> {
  //     updateMap()
  //   }, 7000)
  // })

  //===>> It works here..

  useEffect(() => {
    const interval = setInterval(() => {
      updateMap()
    }, 7000)
    return () => clearInterval(interval)
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
        dropLocation[0]?.latitude,
        dropLocation[0]?.longitude,
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

  const endTrip = () => {
    let params = {
      purchase_id: purchase_id,
    }
    setLoading(true)
    new APIRequest.Builder()
      .post()
      .reqURL(Config.END_POINTS.END_RIDE)
      .jsonParams(params)
      .response(response => {
        console.log('Response ', response)
        dispatch(setAppState(Config.AppStateEnum.RIDE_ENDED))
        props.navigation.pop(4)
        setLoading(false)
      })
      .error(error => {
        console.log('Showing error', error)
        setLoading(false)
      })
      .build()
      .doRequest()
  }

  const receiptPicture = () => {
    getCameraPicture(
      image => {
        image?.map(pickedImage => {
          setPickedImage(pickedImage), (imageUpload = pickedImage)
        })
        // uploadPicture()
      },
      error => {
        console.log('Camera error', error)
      },
    )
  }
  const deliveryPicture = () => {
    getCameraPicture(
      image => {
        image?.map(pickedImage => {
          setPickedImageDelivery(pickedImage), (imageUpload = pickedImage)
        })
        // uploadPicture()
      },
      error => {
        console.log('Camera error', error)
      },
    )
  }

  const pictureValidation = () => {
    console.log('In picture validation')
    if (pickedImage == null || pickedImageDelivery == null || amount == null) {
      console.log('In true')
      alert(
        'Enter required information (Digital Signature, Delivery Proof, Purchase Amount)',
      )
    } else {
      console.log('In else')
      fareCalculation()
    }
  }

  const fareCalculation = () => {
    let params = {
      is_estimated: false,
      purchase_amount: amount ? amount : 0,
      miles: 25,
      minutes: 40,
      storeCost: 0,
    }
    setLoading(true)
    new APIRequest.Builder()
      .post()
      .reqURL(`${Config.END_POINTS.PURCHASE}/${purchase_id}/calculate-fare`)
      .jsonParams(params)
      .response(response => {
        console.log('Response of fare calculation ', response), endTrip()
        setLoading(false)
      })
      .error(error => {
        console.log('Showing error', error)
        setLoading(false)
      })
      .build()
      .doRequest()
  }

  const uploadPicture = async () => {
    // let params = {
    //   image_type: 'purchase',
    //   image: imageUpload
    // }
    // new APIRequest.Builder()
    // .post()
    // .reqURL(Config.END_POINTS.IMAGE)
    // .addFile(1, imageUpload?.uri, imageUpload?.type, imageUpload?.fileName)
    // .response(response => {
    //   console.log("Response ", response)
    //  })
    // .error(error => {
    //   console.log('Showing error', error)
    // })
    // .build()
    // .doRequest()

    var photo = {
      uri: imageUpload.uri,
      type: imageUpload.type,
      name: imageUpload.name,
    }

    //use formdata
    var formData = new FormData()
    //append created photo{} to formdata
    formData.append('image_type', 'purchase')
    formData.append('api_key', token)
    formData.append('image', photo)
    //use axios to POST
    await axios({
      method: 'POST',
      url: Config.API_URL + Config.END_POINTS.IMAGE,
      data: formData,
      headers: {
        Authorization: 'Bearer ' + token,
        // 'Accept': 'application/json',
        'Content-Type': 'multipart/form-data;',
      },
    })
      .then(function (response) {
        console.log('Image axios Reponse', response)
      })
      .catch(function (error) {
        console.log('Image axios Error', error.response)
      })
  }

  return (
    <View style={Layout.fill}>
      {!headers && <FullScreenHeader onPress={() => setHeaders(true)} />}
      {headers && (
        <>
          <VeroHeader title="Ride to Destination" />
          <TopHeaderExchange
            onPressMessage={() => navigate('ChatScreen')}
            onPressCall={() => console.warn("You can't make call")}
            onPressSignature={() => setModalVisible(true)}
            onPressPicture={deliveryPicture}
            signatureImage={pickedImage}
            deliveryImage={pickedImageDelivery}
            value={amount}
            onChangeText={text => setAmount(text)}
            onPressEnd={pictureValidation}
            serviceType={serviceType}
            pickupFrom={pickup}
            status={statusIs}
          />
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
            {coordinates.map((coordinate, index) => (
              <MapView.Marker.Animated
                key={`coordinate_${index}`}
                onLoad={() => forceUpdate()}
                coordinate={coordinates[0]}
              >
                <Icon name="map-marker" size={30} color={Colors.black} />
              </MapView.Marker.Animated>
            ))}
            <MapView.Marker.Animated
              coordinate={startCoordinate}
              onLoad={() => forceUpdate()}
              flat={true}
              ref={markerRef}
            >
              <Icon name="location-arrow" size={30} color={Colors.orange} />
            </MapView.Marker.Animated>
            {coordinates.length >= 2 && (
              <MapViewDirections
                origin={coordinates[1]}
                waypoints={
                  coordinates.length > 2 ? coordinates.slice(1, -1) : []
                }
                destination={coordinates[0]}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={3}
                strokeColor="#000000"
                resetOnChange={false}
                mode="DRIVING"
                onStart={params => {
                  console.log(
                    `Started routing between "${params.origin}" and "${params.destination}"`,
                  )
                }}
                onError={errorMessage => {
                  console.log('GOT AN ERROR')
                }}
              />
            )}
          </MapView>
        )}
        <SignatureModal
          onPressCross={() => setModalVisible(!modalVisible)}
          onPressSave={() => setModalVisible(!modalVisible)}
          signatureSaved={item => setPickedImage(item)}
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible)
          }}
        />
      </View>
      {loading && <VeroLoader />}
    </View>
  )
}

export default RideToPickup
