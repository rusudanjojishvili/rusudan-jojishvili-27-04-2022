import axios from 'axios'
import { createSlice } from '@reduxjs/toolkit'
import { BASE_URL, END_POINT, apikey } from '../utils/constants'
import { setParams } from '../utils/setParams'

export const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        currentWeather: null,
        fiveDayForecast: null,

    },
    reducers: {
        setCurrentWeather: (state, action) => {
            state.currentWeather = action.payload
        },
        setFiveDateForecast: (state, action) => {
            state.fiveDayForecast = action.payload
        }
    }
})

export const getCurrentWeather = (locationId) => async(dispatch) => {
    let requestParams = {
        apikey,
        language: 'en-us',
        details: false
    }
    console.log(setParams(requestParams),'params')
    try {
    //   const res = await axios.get(`${BASE_URL}${END_POINT.CURRENT_CONDITIONS}/v1/${locationId}`, 
    //   setParams(requestParams))
    const res = null
      console.log(res, 'res')
      if(res?.status === 200 && res?.data?.length){
          dispatch(setCurrentWeather(res.data[0]))
      }
    } catch (error) {

    }
}

export const getFiveDayForecast= (locationId) => async(dispatch) => {
    let requestParams = {
        apikey,
        language: 'en-us',
        details: false,
        matric: true
    }
    try {
    //   const res = await axios.get(
    //     `${BASE_URL}${END_POINT.FORECASTS}/v1/daily/5day/${locationId}`, 
    //     setParams(requestParams)
    //     )
    const res = null
      if(res.status === 200){
          dispatch(setFiveDateForecast(res.DailyForecasts))
      }
    } catch (error) {

    }
}
// export const searchByCity= (searchTerm) => async(dispatch) => {
//     let requestParams = {
//         apikey,
//         q: searchTerm,
//         language: 'en-us'
//     }
//     try {
//       const res = await axios.get(
//         `${BASE_URL}${END_POINT.LOCATIONS}/v1/cities/autocomplete`, 
//         setParams(requestParams)
//         )
//     // const res = null
//       if(res.status === 200){
//           console.log(res, 'res search')
//       }
//     } catch (error) {

//     }
// }


export const {
    setCurrentWeather,
    setFiveDateForecast
} = weatherSlice.actions

export default weatherSlice.reducer


