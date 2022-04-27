import { combineReducers } from '@reduxjs/toolkit'
import weatherReducer from './weatherSlice'

const appReducer = combineReducers({
  weatherDetails: weatherReducer
})

const RootReducer = (state, action) => {
    return appReducer(state, action)
}

export default RootReducer