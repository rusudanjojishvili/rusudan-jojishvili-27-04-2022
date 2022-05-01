import React, { useEffect,useMemo, useState } from 'react'
import {Route, Routes, Navigate } from 'react-router-dom'
import { Grid } from '@mui/material'
import './App.css'
import WeatherPage from './pages/WeatherPage'
import FavoritesPage from './pages/FavoritesPage'
import { useSelector, useDispatch } from 'react-redux'
import * as weatherActions from './redux/weatherSlice'
import Topbar from './components/navigations/Navbar'
import { createTheme, ThemeProvider, StyledEngineProvider} from '@mui/material/styles';
import { getDesignTokens } from './utils/constants'
import CssBaseline from "@mui/material/CssBaseline";
import DayBackground from './assets/images/day.jpg'
import NightBackground from './assets/images/night1.jpg'
import Snackbar from './components/snackbar'
import { setParams } from './utils/setParams'
import { BASE_URL, END_POINT, apikey } from './utils/constants'
import axios from 'axios'


const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function App() {
  const [mode, setMode] = React.useState('light');

  //color mode changing handler
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  
  const currentWeather = useSelector(state => state.weatherDetails?.currentWeather)

  const isDayTime = useMemo(() => currentWeather? currentWeather.IsDayTime : true, [currentWeather])

  // set background color according to the daytime of the searched city
  const backgroundImage = useMemo(() => isDayTime? DayBackground : NightBackground, [isDayTime])

  const containerStyle = {
    marginTop: '64px',
    height: 'calc(100vh - 70px)', 
    overflow: 'auto',
    backgroundImage:`url(${backgroundImage})`,
    backgroundPosition: isDayTime?'0% 45%' : '0% 0%', 
    backgroundSize: 'cover',
    padding: {xs:'20px 10px', sm: '20px'},
    '&::-webkit-scrollbar': {
      width: '10px',
      height: '3px',
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 5px #1f576e',
      borderRadius: '10px',   
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#fffefea6',
      borderRadius: '10px',
      height: '10px'
    },
    '&::-webkit-scrollbar-thumb:hover': {
      backgroundColor: '#ffffffcf',
      borderRadius: '10px',
      height: '10px'
    },
  }

  useEffect(() => {
    let favorites = JSON.parse(localStorage.getItem('FAVORITES'))
    // Update redux state when user refreshed the page
    if (favorites) {
      dispatch(weatherActions.setFavorites(favorites))
    }
  }, [])

  const currentCity = useSelector(state => state.weatherDetails?.currentLocation)

  const dispatch = useDispatch()

  // get the location key according to the lon/lat pair
  const getLocation = async({latLongPair}) => {
    let requestParams = {
        apikey,
        q: latLongPair,
        language: 'en-us'
    }
    try {
      const res = await axios.get(
        `${BASE_URL}${END_POINT.LOCATIONS}/v1/cities/geoposition/search`, 
        setParams(requestParams)
        )
    // const res = null
      if(res?.status === 200){
          return res.data
      }
    } catch (error) {
        return 'error'
    }
  }
  //get current location latitude and longitude according to which the city location key can be optained -->
  //through the accuweather location api
  const getCurrentCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
      async function(position) {
      let myLocation = await getLocation({
        latLongPair: `${position.coords.latitude},${position.coords.longitude}`
      })
      if(myLocation){
        dispatch(weatherActions.setCurrentLocation({
          key: myLocation.Key, 
          city: myLocation.AdministrativeArea?.EnglishName,
          country: myLocation.Country?.EnglishName
        }))
      }
    },
      function(error) {
        // if there has been a denial to eccess the geolocation or an error has been appeared -->
        // set Tel aviv as the default city
        dispatch(weatherActions.setCurrentLocation({
          key: 215854, 
          city: "Tel Aviv",
          country: "Israel"
        }))
      }
    ); 
   
  }


  useEffect(() => {
    if(currentCity === null){

      getCurrentCoordinates()
      // dispatch(weatherActions.setCurrentLocation({
      //   key: 215854, 
      //   city: "Tel Aviv",
      //   country: "Israel"
      // }))
    }
  },[currentCity])

  return (
    <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
    <StyledEngineProvider injectFirst>
    <CssBaseline/>
    <div className="App">
    <Topbar ColorModeContext={ColorModeContext}/>
    <Snackbar/>
    <Grid sx={containerStyle}>
      <Routes>
        <Route path='/*' element={<Navigate replace to='/home'/>}/>
        <Route path='/home' element={<WeatherPage/>} />
        <Route path='/favorites' element={<FavoritesPage/>} />
      </Routes>
    </Grid>
    </div>
    </StyledEngineProvider>
    </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;