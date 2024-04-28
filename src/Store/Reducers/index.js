import * as Actions from '../Actions/ActionTypes'
const User = (state = { user: null, 
  token: null, 
  user_id: null, 
  purchase_id: null, 
  rideDetails: null, 
  itemDetails: null,
  activeStatus: null,
  userServiceTypes: null,
  appState: null,
  startTime: null }, action) => {
  console.log('showing values of actions here', action)
  switch (action.type) {
    case Actions.USER:
      return {
        ...state,
        user: action.user,
        token: action.user.api_key,
        user_id: action.user._id
      }
      case Actions.PURCHASE_ID:
      return {
        ...state,
        purchase_id: action.purchase_id,
      }
      case Actions.RIDE_DETAILS:
        return {
          ...state,
          rideDetails: action.rideDetails,
        }
        case Actions.ITEM_DETAILS:
        return {
          ...state,
          itemDetails: action.itemDetails,
        }
        case Actions.ACTIVE_STATUS:
        return {
          ...state,
          activeStatus: action.activeStatus,
        }
        case Actions.USER_SERVICE_TYPES:
          return {
            ...state,
            userServiceTypes: action.userServiceTypes,
          }
        case Actions.APP_STATE:
          return {
            ...state,
            appState: action.appState,
          }
        case Actions.START_TIME:
          return {
            ...state,
            startTime: action.startTime,
          }
    default
    :
      return state
  }
}

export default User
