import React from 'react'
import axios from 'axios'
import { View, TouchableOpacity } from 'react-native'
import { VeroHeader, VeroLoader } from '@/Components'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/Hooks'
import { Colors } from '@/Theme/Variables'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import RequestHeader from './Components/RequestHeader'
import BottomHeader from './Components/BottomHeader'
import { useDispatch, useSelector } from 'react-redux'
import { setRideDetails, setItemDetails, setAppState } from '@/Store/Actions'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useEffect, useState } from 'react'
import { APIRequest } from '@/Services/ApiRequest'
import Geolocation from 'react-native-geolocation-service'
import { Config } from '@/Config'
import { navigate, goBack } from '@/Navigators/utils'
import FullScreenBackButton from './Components/FullScreenBackButton'
import RequestHeaderFood from './Components/RequestHeaderFood'
import RequestHeaderPurchase from './Components/RequestHeaderPurchase'

const TripNotification = props => {
  let dist,
    time,
    place,
    cLatitude = 0,
    cLongitude = 0,
    ride_type,
    restaurantID,
    restaurantCompare,
    distDrop,
    timeDrop,
    placeDrop
  let FoodData = new Array()
  const purchase_id = useSelector(state => state.user.purchase_id)
  const { Layout, Images } = useTheme()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [serviceType, setServiceType] = useState()
  const [pickupFrom, setPickupFrom] = useState([])
  const [dropOff, setDropOff] = useState([])
  const [timeToReach, setTimeToReach] = useState()
  const [headers, setHeaders] = useState(true)
  const [rideData, setRideData] = useState()
  const [restaurantDetails, setRestaurantDetails] = useState()
  const [puchasesDetails, setPurchasesDetails] = useState()
  const [itemExchangeDetails, setItemExchangeDetails] = useState()
  const [itemReturnDetails, setItemReturnDetails] = useState()
  const [packageDetails, setPackageDetails] = useState()
  const [services_type, setServices_Type] = useState()
  const [foodItems, setFoodItems] = useState()
  const [distance, setDistance] = useState()
  const [dropDistance, setDropDistance] = useState()
  const [pickupCoordinates, setPickupCoordinates] = useState([])
  const [dropCoordinates, setDropCoordinates] = useState([])
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0,
  })

  useEffect(() => {
    watchingPosition(), getPurchase()
  }, [])

  const watchingPosition = () => {
    Geolocation.getCurrentPosition(
      position => {
        ;(cLatitude = position?.coords?.latitude),
          (cLongitude = position?.coords?.longitude),
          console.log('watching positions: ', cLatitude, '& ', cLongitude)
        setCurrentLocation({
          latitude: position?.coords?.latitude,
          longitude: position?.coords?.longitude,
        })
        // this.firebaseTopic(
        //   position.coords.latitude,
        //   position.coords.longitude,
        //   userId,
        // );
      },
      error => console.log(error),
      { enableHighAccuracy: true, timeout: 15000, interval: 30000 },
    )
  }

  const getPurchase = () => {
    setLoading(true)
    new APIRequest.Builder()
      .get()
      .reqURL(`${Config.END_POINTS.PURCHASE}/${purchase_id}`)
      .jsonParams()
      .response(response => {
        console.log('Response ', response),
          setRideData(response?.data?.data?.data),
          (restaurantID =
            response?.data?.data?.data?.food_delivery?.restaurant_id),
          setFoodItems(response?.data?.data?.data?.food_delivery?.items),
          setPurchasesDetails(response?.data?.data?.data?.item_purchases),
          setItemExchangeDetails(response?.data?.data?.data?.item_exchange)
        setItemReturnDetails(response?.data?.data?.data?.item_return)
        setPackageDetails(response?.data?.data?.data?.drop_of_packages?.items)
        assignValues(response?.data?.data?.data?.service_type),
          setServices_Type(response?.data?.data?.data?.service_type)
        calculateDistanceTime(
          response?.data?.data?.data?.pick_up_location?.coordinates[0],
          response?.data?.data?.data?.pick_up_location?.coordinates[1],
        )
        calculateDropOffDistanceTime(
          response?.data?.data?.data?.pick_up_location?.coordinates[0],
          response?.data?.data?.data?.pick_up_location?.coordinates[1],
          response?.data?.data?.data?.drop_of_location?.coordinates[0],
          response?.data?.data?.data?.drop_of_location?.coordinates[1],
        )
        setPickupCoordinates([
          {
            latitude:
              response?.data?.data?.data?.pick_up_location?.coordinates[0],
            longitude:
              response?.data?.data?.data?.pick_up_location?.coordinates[1],
          },
        ]),
          setDropCoordinates([
            {
              latitude:
                response?.data?.data?.data?.drop_of_location?.coordinates[0],
              longitude:
                response?.data?.data?.data?.drop_of_location?.coordinates[1],
            },
          ])
        setLoading(false)
      })
      .error(error => {
        console.log('Showing error', error)
        setLoading(false)
      })
      .build()
      .doRequest()
  }
  const assignValues = service_type => {
    if (service_type == 'pick_up') {
      setServiceType('PackagePickup/Delivery')
    } else if (service_type == 'item_purchase') {
      setServiceType('Item Purchase')
    } else if (service_type == 'item_return') {
      setServiceType('Item Return')
    } else if (service_type == 'ride_share') {
      setServiceType('Ride Pool')
    } else if (service_type == 'ride_single') {
      setServiceType('Ride Single')
    } else if (service_type == 'item_exchange') {
      setServiceType('Item Exchange')
    } else if (service_type == 'food_delivery') {
      setServiceType('Food Delivery')
      getRestaurant()
    } else {
      setServiceType('Undefined Service Type')
    }
  }

  const calculateDistanceTime = (latitude, longitude) => {
    axios({
      method: 'get',
      url:
        'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=' +
        cLatitude +
        ',%20' +
        cLongitude +
        '&destinations=' +
        latitude +
        ',%20' +
        longitude +
        '&key=AIzaSyC6Vo_6ohnkLyGIw2IPmZka0TarRaeWJ2g',
    })
      .then(function (response) {
        console.log('google map api response: ', response)
        setDistance(
          response?.data?.rows[0]?.elements[0]?.distance?.value *
            0.000621371192,
        ),
          // setTimeToReach(response?.data?.rows[0]?.elements[0]?.duration?.value / 60)?.toFixed(),
          setPickupFrom(response?.data?.destination_addresses.toString()),
          (dist =
            response?.data?.rows[0]?.elements[0]?.distance?.value *
            0.000621371192)
        time = (
          response?.data?.rows[0]?.elements[0]?.duration?.value / 60
        )?.toFixed()
        place = response?.data?.destination_addresses
        console.log('distance: ', dist)
        console.log('time: ', time)
        console.log('place: ', place)
        setTimeToReach(`${time} mins`)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const calculateDropOffDistanceTime = (picklat, picklng, droplat, droplng) => {
    axios({
      method: 'get',
      url:
        'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=' +
        picklat +
        ',%20' +
        picklng +
        '&destinations=' +
        droplat +
        ',%20' +
        droplng +
        '&key=AIzaSyC6Vo_6ohnkLyGIw2IPmZka0TarRaeWJ2g',
    })
      .then(function (response) {
        setDropOff(response?.data?.destination_addresses.toString()),
          setDropDistance(
            response?.data?.rows[0]?.elements[0]?.distance?.value *
              0.000621371192,
          ),
          (dist =
            response?.data?.rows[0]?.elements[0]?.distance?.value *
            0.000621371192)
        time = (
          response?.data?.rows[0]?.elements[0]?.duration?.value / 60
        )?.toFixed()
        place = response?.data?.destination_addresses
        console.log('distance drop: ', dist)
        console.log('time drop: ', time)
        console.log('place drop: ', place)
        // setTimeToReach(`${time} mins`)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const acceptRide = () => {
    let data = {
      name: 'Passenger',
      pickup:
        serviceType == 'Food Delivery'
          ? restaurantDetails?.display_name
          : serviceType == 'Item Purchase'
          ? puchasesDetails?.store
          : pickupFrom,
      service: serviceType,
      service_type: services_type,
      dropOff: dropOff,
      status: 'Pending',
      finalDistance: dropDistance,
      pickupLocation: pickupCoordinates,
      dropLocation: dropCoordinates,
      restaurantDetails: restaurantDetails,
      itemPurchaseDetails: puchasesDetails,
      itemExchangeDetails: itemExchangeDetails,
      itemReturnDetails: itemReturnDetails,
    }
    dispatch(setRideDetails(data))
    dispatch(setAppState(Config.AppStateEnum.RIDE_ACCEPTED))
    let params = {
      purchase_id: purchase_id,
    }
    setLoading(true)
    new APIRequest.Builder()
      .post()
      .reqURL(Config.END_POINTS.ACCEPT_RIDE)
      .jsonParams(params)
      .response(response => {
        console.log('Response ', response)
        if (serviceType == 'Food Delivery') {
          findFinalFoodList()
        } else if (serviceType == 'Item Purchase') {
          findFinalItemsPurchaseList()
          findFinalPackagesList()
        } else if (serviceType == 'PackagePickup/Delivery') {
          findFinalPackagesList()
        } else if (serviceType == 'Item Exchange') {
          findFinalExchangeList()
        }
        navigate('RideScreen')
        setLoading(false)
      })
      .error(error => {
        console.log('Showing error', error)
        setLoading(false)
      })
      .build()
      .doRequest()
  }

  const cancelRide = () => {
    let params = {
      purchase_id: purchase_id,
    }
    setLoading(true)
    new APIRequest.Builder()
      .post()
      .reqURL(Config.END_POINTS.CANCEL_RIDE)
      .jsonParams(params)
      .response(response => {
        console.log('Response ', response), goBack()
        setLoading(false)
      })
      .error(error => {
        console.log('Showing error', error)
        setLoading(false)
      })
      .build()
      .doRequest()
  }

  const getRestaurant = () => {
    setLoading(true)
    new APIRequest.Builder()
      .get()
      .reqURL(`${Config.END_POINTS.RESTAURANT}/${restaurantID}`)
      .jsonParams()
      .response(response => {
        console.log('Response ', response?.data?.data),
          setRestaurantDetails(response?.data?.data),
          (restaurantCompare = response?.data?.data?.menus)
        setLoading(false)
      })
      .error(error => {
        console.log('Showing error', error)
        setLoading(false)
      })
      .build()
      .doRequest()
  }

  const findFinalFoodList = () => {
    console.log('foodItems', foodItems)
    console.log('restaurantCompare', restaurantDetails?.menus)
    foodItems.map(itemFood => {
      restaurantDetails?.menus.map(itemMenus => {
        if (itemFood._id == itemMenus._id) {
          let finalItemsData = {
            image: itemMenus?.pictures[0][0],
            name: itemMenus?.name,
            qty: itemFood?.quantity,
            size: itemFood?.additionalInfo?.size ?? 'Normal',
            crust: itemFood?.additionalInfo?.crust ?? 'Not Found',
            extras: itemFood?.additionalInfo?.extras ?? 'Not Found',
          }
          FoodData.push(finalItemsData)
        }
      })
    })
    console.log('Final Foods List', FoodData)
    dispatch(setItemDetails(FoodData))
  }
  const findFinalItemsPurchaseList = () => {
    const itemsList = puchasesDetails?.items
    itemsList.map(item => {
      let itemFinalList = {
        image: item?._id?.product_image,
        name: item?._id?.product_name,
        qty: item.quantity,
        price: item?._id?.product_price,
        product_category: item?._id?.product_category?.name,
      }
      FoodData.push(itemFinalList)
    })
    console.log('Final Foods List', FoodData)
    dispatch(setItemDetails(FoodData))
  }

  const findFinalPackagesList = () => {
    const itemsList = packageDetails
    itemsList.map(item => {
      let itemFinalList = {
        image: item?.image_url,
        package_type: item?.package_type,
        item_type: item?.item_type,
        item_weight: item?.item_weight,
        size: item?.size,
      }
      FoodData.push(itemFinalList)
    })
    console.log('Final Foods List', FoodData)
    dispatch(setItemDetails(FoodData))
  }
  const findFinalExchangeList = () => {
    const itemsList = itemExchangeDetails?.items
    itemsList.map(item => {
      let itemFinalList = {
        reciept_image: item?.reciept_image,
        item_image: item?.item_image,
        details: item?.details,
      }
      FoodData.push(itemFinalList)
    })
    console.log('Final Foods List', FoodData)
    dispatch(setItemDetails(FoodData))
  }
  return (
    <View style={Layout.fill}>
      {!headers && <FullScreenBackButton onPress={() => setHeaders(true)} />}
      {headers && (
        <>
          <VeroHeader title={t('tripTitle')} />

          {serviceType == 'Food Delivery' ? (
            <RequestHeaderFood
              serviceType={serviceType}
              pickupFrom={restaurantDetails?.display_name}
              timeToReach={timeToReach}
            />
          ) : serviceType == 'Item Purchase' ? (
            <RequestHeaderPurchase
              serviceType={serviceType}
              pickupFrom={puchasesDetails?.store}
              timeToReach={timeToReach}
            />
          ) : (
            <RequestHeader
              serviceType={serviceType}
              pickupFrom={pickupFrom}
              timeToReach={timeToReach}
            />
          )}
        </>
      )}
      {pickupCoordinates.length > 0 ? (
        <View style={Layout.fill}>
          <MapView
            pointerEvents={'none'}
            provider={PROVIDER_GOOGLE}
            pitchEnabled={false}
            rotateEnabled={false}
            zoomControlEnabled={false}
            zoomEnabled={true}
            zoomTapEnabled={true}
            scrollEnabled={false}
            style={Layout.map}
            onPress={() => setHeaders(false)}
            region={{
              latitude: pickupCoordinates[0].latitude,
              longitude: pickupCoordinates[0].longitude,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
          >
            {pickupCoordinates.map((marker, index) => (
              <MapView.Marker
                key={`coordinate_${index}`}
                coordinate={pickupCoordinates[0]}
                title={marker.title}
                description={marker.description}
              >
                <Icon name="location-pin" size={30} color={Colors.black} />
              </MapView.Marker>
            ))}
          </MapView>
        </View>
      ) : (
        <View style={Layout.fill}>
          <MapView
            pointerEvents={'none'}
            provider={PROVIDER_GOOGLE}
            style={Layout.map}
            onPress={() => setHeaders(false)}
            region={{
              latitude: 44.42,
              longitude: 26.1,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
          ></MapView>
        </View>
      )}

      {headers && (
        <BottomHeader onPressAccept={acceptRide} onPressReject={cancelRide} />
      )}
      {loading && <VeroLoader />}
    </View>
  )
}

export default TripNotification
