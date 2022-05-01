import axios from 'axios'
import { createSlice } from '@reduxjs/toolkit'
import { BASE_URL, END_POINT, apikey } from '../utils/constants'
import { setParams } from '../utils/setParams'
import * as snackbarActions from './snackbarSlice';

export const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        currentLocation: null,
        temperatureType: 'Metric',
        currentWeather: null,
        fiveDayForecast: null,
        favorites: []
    },
    reducers: {
        setCurrentWeather: (state, action) => {
            state.currentWeather = action.payload
        },
        setFiveDateForecast: (state, action) => {
            state.fiveDayForecast = action.payload
        },
        setCurrentLocation:(state, action) => {
            console.log(action.payload, 'action.payload')
            state.currentLocation = action.payload
        },
        toggleTempType: (state, action) => {
           state.temperatureType = action.payload
        },
        setFavorites: (state, action) => {
          state.favorites = action.payload
        },
        addToFavorites: (state, action) => {
            const favoritesCopy = [...state.favorites]
            const favoriteIndex = favoritesCopy.findIndex(favorite =>favorite.id === action.payload.id)
            if(favoriteIndex === -1){
                favoritesCopy.push(action.payload)
            }else{
                favoritesCopy.splice(favoriteIndex, 1)
            }
            state.favorites = favoritesCopy
            localStorage.setItem('FAVORITES', JSON.stringify(state.favorites))
        }
    }
})

export const getCurrentWeather = (locationId) => async(dispatch) => {
    let requestParams = {
        apikey,
        language: 'en-us',
        details: true
    }

    try {
      const res = await axios.get(`${BASE_URL}${END_POINT.CURRENT_CONDITIONS}/v1/${locationId}`, 
      setParams(requestParams))
    // const res = null
      if(res?.status === 200 && res?.data?.length){
        dispatch(setCurrentWeather(res.data[0]))
      }
    } catch (error) {
        dispatch(snackbarActions.setSnackBar('error', 'Error loading data', 3000));
    }
}

export const getFiveDayForecast= (locationId) => async(dispatch, getState) => {
  const currentTempType = getState()?.weatherDetails?.temperatureType
    let requestParams = {
        apikey,
        language: 'en-us',
        details: false,
        metric: Boolean(currentTempType === 'Metric')
    }
    try {
      const res = await axios.get(
        `${BASE_URL}${END_POINT.FORECASTS}/v1/daily/5day/${locationId}`, 
        setParams(requestParams)
        )
    // const res = null
      if(res.status === 200){
          dispatch(setFiveDateForecast(res?.data?.DailyForecasts))
      }
    } catch (error) {
      dispatch(snackbarActions.setSnackBar('error', 'Error loading Forecast data', 3000));
    }
}



export const {
    setCurrentWeather,
    setFiveDateForecast,
    setCurrentLocation,
    toggleTempType,
    setFavorites,
    addToFavorites
} = weatherSlice.actions

export default weatherSlice.reducer


