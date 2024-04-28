import * as ActionTypes from './ActionTypes'

export const userAuth = user => ({
  type: ActionTypes.USER,
  user: user,
})
export const userLogout = logout => ({
  type: ActionTypes.LOGOUT,
})
export const setPurchaseID = id => ({
  type: ActionTypes.PURCHASE_ID,
  purchase_id: id,

})
export const setRideDetails = ride => ({
  type: ActionTypes.RIDE_DETAILS,
  rideDetails: ride,

})
export const setItemDetails = item => ({
  type: ActionTypes.ITEM_DETAILS,
  itemDetails: item,

})
export const setActiveStatus = item => ({
  type: ActionTypes.ACTIVE_STATUS,
  activeStatus: item,

})
export const setUserServiceType = type => ({
  type: ActionTypes.USER_SERVICE_TYPES,
  userServiceTypes: type,
})
export const setAppState = appState => ({
  type: ActionTypes.APP_STATE,
  appState: appState,
})

export const setStartTime = start => ({
  type: ActionTypes.START_TIME,
  startTime: start,
})



