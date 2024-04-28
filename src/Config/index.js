export const Config = {
  // New APIs URL
  API_URL: 'https://vero-1.herokuapp.com/api/v1/',
  // Old APIs URL
  // API_URL: 'http://157.230.183.30:3000/',

  END_POINTS: {
    LOGIN: 'auth/login', 
    FORGOT: 'auth/forget-password', 
    UPDATE_DRIVER_LOCATION: 'driver/update-location',
    ACCEPT_RIDE: 'driver/accept-ride', 
    START_RIDE: 'driver/start-ride', 
    END_RIDE: 'driver/end-ride',
    ARRIVE_RIDE: 'driver/arrive-ride',
    USERS: 'users',
    CANCEL_RIDE: 'driver/cancel-ride',
    PURCHASE: 'purchase',
    RESTAURANT: 'restaurant',
    IMAGE: 'image',
    RIDES: 'driver/rides',
    UPLOAD_FILES: 'files/temp-files',
    SERVICE_TYPE: 'users/service-type',
    CHANGE_PASSWORD: 'users/change-password'
  },
  SnackBarEnum: {
    INFO: 'info',
    SUCCESS: 'success',
    ERROR: 'error',
  },

  AppStateEnum: {
    RIDE_ACCEPTED: 'ride_accepted',
    RIDE_STARTED: 'ride_started',
    RIDE_ARRIVED: 'ride_arrived',
    RIDE_ENDED: 'ride_ended'
  },

  ResponseCode: {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    UNPROCESSABLE_REQUEST: 422,
    INTERNAL_SERVER_ERROR: 500,
    TOKEN_INVALID: 503,
    NO_INTERNET: 522,
    BAD_GATEWAY: 502,
  },
}
