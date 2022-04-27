import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as weatherActions from '../redux/weatherSlice'
import { Grid } from '@mui/material'

function WeatherPage() {
const currentWeather = useSelector(state => state.weatherDetails)
const dispatch = useDispatch()

useEffect(() => {
  dispatch(weatherActions.getCurrentWeather(215854))
  dispatch(weatherActions.getFiveDayForecast(215854))
},[])

console.log(currentWeather, 'currentWeather')
  return (
    <Grid container>
       <Grid item xs={12} style={{border: '1px solid red'}}>
           
       </Grid>
    </Grid>
  )
}

export default WeatherPage
