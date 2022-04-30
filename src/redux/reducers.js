import { combineReducers } from '@reduxjs/toolkit'
import weatherReducer from './weatherSlice'
import snackbarSlice from './snackbarSlice'

const appReducer = combineReducers({
  weatherDetails: weatherReducer,
  snackbar: snackbarSlice
})

const RootReducer = (state, action) => {
    return appReducer(state, action)
}

export default RootReducer