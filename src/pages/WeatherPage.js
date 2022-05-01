import React, { useEffect } from 'react'
import DailyForecastItem from '../components/DailyForecastItem'
import { useSelector, useDispatch } from 'react-redux'
import * as weatherActions from '../redux/weatherSlice'
import { Grid, Typography, IconButton, CircularProgress } from '@mui/material'
import SearchAutocomplete from '../components/SearchAutocomplete'
import { parseISO, format } from 'date-fns'
import Image from '../utils/PNGIcon'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import DayBackground from '../assets/images/day.jpg'
import { ReactComponent as LocationIcon } from '../assets/icons/locationIcon.svg'
import { innerContainer} from '../styles/WeatherStyleSXConstants'
import { Container } from '../styles/StyledComponents'

function WeatherPage() {
const currentWeather = useSelector(state => state.weatherDetails?.currentWeather)
const currentCity = useSelector(state => state.weatherDetails?.currentLocation)
const temperatureType = useSelector(state => state.weatherDetails?.temperatureType)
const fiveDayForecast = useSelector(state => state.weatherDetails?.fiveDayForecast)
const favorites = useSelector(state => state.weatherDetails?.favorites)
const dispatch = useDispatch()
//#1f576e header color
useEffect(() => {
  if(currentCity){
    dispatch(weatherActions.getCurrentWeather(currentCity.key))
    // dispatch(weatherActions.getFiveDayForecast(currentCity.key))

  }
  // call the api's each time the current city is changed/searched or navigated through the favorites page
},[currentCity])

useEffect(() => {
  if(temperatureType && currentCity){
    dispatch(weatherActions.getFiveDayForecast(currentCity.key))
  }
},[temperatureType, currentCity])



const addToFavorites = () => {
  dispatch(weatherActions.addToFavorites({
    id: currentCity.key, 
    name: currentCity.city, 
    country:currentCity.country
    // ...currentWeather
  }))
}

// reusable function that returns sample grid for showing current weather details
const renderWeatherDetail = (title, value, unit) => (
<Grid item>
  <Grid container direction={{xs: 'column-reverse', sm: 'row'}}>
    <Grid item>
      <Typography variant='body2'>
        {title} 
      </Typography>
    </Grid>
    <Grid item>
      <Grid container direction='row' justifyContent='center'>
        <Grid item>
          <Typography sx={{ml: {xs: '0px', sm: 2}, fontSize: {xs: '22px', sm: '16px'}}}>
            {value}
          </Typography>
        </Grid>         
        <Grid item>
          <Typography variant='body2' sx={{mb: -2, ml: '5px'}}>
            {unit}
          </Typography>
        </Grid>
      </Grid>
    </Grid>     
  </Grid>                
</Grid>
)

  return (
   <Grid container sx={{height: '100%'}} justifyContent='center' alignItems='center'>
      {currentWeather && fiveDayForecast? 
      <Container item> 
        <Grid container sx={innerContainer}>
          <Grid item xs={12} sx={{display: { xs: 'flex', sm: 'none'}, p: '10px' }}>
            <Grid container justifyContent='center'>
              <SearchAutocomplete/>                
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ p: { xs: '10px', sm: '0'} }}>
            <Grid container justifyContent='space-between' alignItems='center'>
              <Grid item xs={9} sm={4}>
                  <Grid container alignItems='center'>
                    <LocationIcon/>  
                    <Typography sx={{ ml: 2, fontSize: { xs: 20, sm: 18 }}}>
                      {currentCity?.city}, {currentCity?.country}
                    </Typography>               
                  </Grid>
              </Grid>
              <Grid item sx={{display: { xs: 'none', sm: 'flex' }}} sm={6} md={4} alignItems='flex-end'>
                <Grid container justifyContent='center'>
                  <SearchAutocomplete/>                
                </Grid>
              </Grid>
              <Grid item sm={2} md={4} alignItems='flex-end'>
              <Grid container justifyContent='flex-end'>
                <IconButton onClick={addToFavorites}>
                  {currentCity && favorites?.some(favorite => favorite.id === currentCity.key)?
                  <FavoriteIcon style={{ color: '#a50606', fontSize: 28}}/> : <FavoriteBorderIcon style={{ color: '#FFFFFF', fontSize: 28}}/>}   
                </IconButton>            
              </Grid>           
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{mt: { xs: 1, sm: 3}}}>
            <Grid container 
            justifyContent='center' 
            alignItems='center' 
            style={{position: 'relative', right: '30px'}}>
              <Grid item>
                {currentWeather?.WeatherIcon && <Image fileName={currentWeather.WeatherIcon} size={130}/>}
              </Grid>
              <Grid item>
                <Typography variant='h4'>
                {currentWeather?.Temperature?.[temperatureType]?.Value}
                </Typography>
              </Grid>
              <Grid item sx={{mt:1, ml: 1}}>
                <Typography variant='h4'>
                  {'\u00b0'}
                </Typography>
              </Grid>
              <Grid item sx={{ ml: 2}}>
                <Typography variant='h4'>
                {currentWeather?.Temperature?.[temperatureType]?.Unit}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{mt: -1}}>
            <Grid container direction='column' alignItems='center'>
                <Grid item>
                  <Typography variant='h2'>
                  {currentWeather?.WeatherText}
                </Typography>
                </Grid>              
                <Grid item >
                <Typography variant='subtitle2'>
                  Updated as of {currentWeather?.LocalObservationDateTime && format(parseISO(currentWeather.LocalObservationDateTime), 'HH:mm')}
                </Typography>
                </Grid>              
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{mt: 3, p: { xs: '15px', sm: 0}}}>
            <Grid container justifyContent='center'>
            {/* up to lg should be fixed value */}
              <Grid item sx={{width:600}}>
               <Grid container>
                <Grid item xs={12} style={{padding: {xs: 0, sm: '10px'}}}>
                  <Grid container justifyContent='space-between'>
                    {renderWeatherDetail(
                      'Feels like', 
                      currentWeather?.RealFeelTemperature?.[temperatureType]?.Value,
                      '\u00b0')
                    }
                    {renderWeatherDetail(
                      'Wind', 
                      `${currentWeather?.Wind?.Direction?.Localized} ${currentWeather?.Wind?.Speed?.[temperatureType]?.Value}`
                      )
                    }
                    {renderWeatherDetail(
                      'Visibility', 
                      currentWeather?.Visibility?.[temperatureType]?.Value,
                      currentWeather?.Visibility?.[temperatureType]?.Unit)
                    }
                  </Grid>
                </Grid>
                <Grid item xs={12} sx={{mt: '13px'}}>
                  <Grid container justifyContent='space-between'>
                    {renderWeatherDetail(
                      'Barometer', 
                      currentWeather?.Pressure?.Imperial?.Value,
                      currentWeather?.Pressure?.Imperial?.Unit)
                    }
                    {renderWeatherDetail(
                      'Humidity', 
                      currentWeather?.RelativeHumidity,
                      '%')
                    }
                    {renderWeatherDetail(
                      'Dew Point', 
                      currentWeather?.DewPoint?.[temperatureType].Value,
                      currentWeather?.DewPoint?.[temperatureType].Unit)
                    }
                  </Grid>
                </Grid>
               </Grid>      
              </Grid>
            </Grid>         
          </Grid>
          <Grid item xs={12} sx={{mt: 5, pb: {xs: '10px', sm: 0}}}>
            <Grid container spacing={{xs: 0, sm: 1}} justifyContent='space-evenly'>
              {fiveDayForecast?.length && fiveDayForecast.map((forecast, index) => (
                <DailyForecastItem key={index} forecast={forecast}/>
              ))} 
            </Grid>
          </Grid>
        </Grid>
        </Container>:
          <Container item>
          <Grid container sx={{...innerContainer, height: 400, width: '100%'}} justifyContent='center' alignItems='center'>
            <Grid item xs={12}>
            <CircularProgress sx={{ color: '#FFFFFF'}} />
            </Grid>
          </Grid>
        </Container>}
      
    </Grid>

    
  )
}

export default WeatherPage
