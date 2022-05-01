import React, {useState, useEffect} from 'react'
import { Grid, Typography, CircularProgress} from '@mui/material'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import * as snackbarActions from '../redux/snackbarSlice'
import { setParams } from '../utils/setParams'
import { BASE_URL, END_POINT, apikey } from '../utils/constants'
import { favoriteItemStyle, forecastItem } from '../styles/WeatherStyleSXConstants'
import Image from '../utils/PNGIcon'

function Favorite({favoriteItem}) {
  const dispatch = useDispatch()
  const [currentWeather, setCurrentWeather] = useState(null)
  const temperatureType = useSelector(state => state.weatherDetails?.temperatureType)

  // send request to the server to receive the current weather of the favorite according to the saved location key
  const getCurrentWeather = async() => {
    let requestParams = {
        apikey,
        language: 'en-us',
        details: false
    }

    try {
      const res = await axios.get(`${BASE_URL}${END_POINT.CURRENT_CONDITIONS}/v1/${favoriteItem.id}`, 
      setParams(requestParams))
    // const res = null
      if(res?.status === 200 && res?.data?.length){
        setCurrentWeather(res.data?.[0])
      }
    } catch (error) {
      dispatch(snackbarActions.setSnackBar('error', 'Error loading data', 3000));
    }
  }

  useEffect(() => {
    getCurrentWeather()
  }, [favoriteItem])
  

  return (
    <Grid container sx={favoriteItemStyle}>
    <Grid item xs={12}>
        <Typography variant='h1'>{favoriteItem.name}</Typography>
    </Grid>
    {currentWeather? <Grid item xs={12}>
      <Grid container>
        <Grid item xs={12} sx={{mt:1}}>
          <Image fileName={currentWeather.WeatherIcon} size={70}/>        
        </Grid>
        <Grid item xs={12}>
            <Typography variant='h5' style={{lineHeight: 1.1}}>{currentWeather.Temperature?.[temperatureType]?.Value}{'\u00b0'}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='body2' sx={{mt:'10px'}}>{currentWeather.WeatherText}</Typography>
        </Grid>
      </Grid>
    </Grid>: 
    <Grid item xs={12}>
      <Grid container justifyContent='center'>
        <CircularProgress sx={{ color: '#FFFFFF'}} />
      </Grid>
    </Grid>}
    </Grid>
       
    )
}

export default Favorite