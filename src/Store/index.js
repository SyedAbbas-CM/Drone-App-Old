import AsyncStorage from '@react-native-async-storage/async-storage'
import { combineReducers } from 'redux'
import * as ActionTypes from '@/Store/Actions/ActionTypes'
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import { configureStore } from '@reduxjs/toolkit'
import user from './Reducers/index'
import theme from './Theme'

const appReducer = combineReducers({
  user,
  theme,
})

const rootReducer = (state, action) => {
  if (action.type === ActionTypes.LOGOUT) {
    // for all keys defined in your persistConfig(s)
    AsyncStorage.removeItem('persist:root')
    // storage.removeItem('persist:otherKey')

    return appReducer(undefined, action)
  }
  return appReducer(state, action)
}

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['theme', 'user'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
    // .concat(api.middleware)

    if (__DEV__ && !process.env.JEST_WORKER_ID) {
      const createDebugger = require('redux-flipper').default
      middlewares.push(createDebugger())
    }

    return middlewares
  },
})

const persistor = persistStore(store)

// setupListeners(store.dispatch)

export { store, persistor }
