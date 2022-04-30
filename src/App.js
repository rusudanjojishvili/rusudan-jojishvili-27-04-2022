import React, { useEffect,useMemo, useState } from 'react'
import {Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import WeatherPage from './pages/WeatherPage'
import FavoritesPage from './pages/FavoritesPage'
import { useSelector, useDispatch } from 'react-redux'
import * as weatherActions from './redux/weatherSlice'
import Topbar from './components/navigations/Navbar'
import SimplePopper from './components/PopperComp'
import { createTheme, ThemeProvider, StyledEngineProvider} from '@mui/material/styles';
import { getDesignTokens } from './utils/constants'
import { amber, deepOrange, grey } from '@mui/material/colors';
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

  const isDayTime = useMemo(() => currentWeather.IsDayTime, [currentWeather])

  const backgroundImage = useMemo(() => isDayTime? DayBackground : NightBackground, [isDayTime])

  const containerStyle = {
    marginTop: '64px',
    height: 'calc(100vh - 70px)', 
    overflow: 'auto',
    backgroundImage:`url(${backgroundImage})`,
    backgroundPosition: isDayTime?'0% 45%' : '0% 0%', 
    backgroundSize: 'cover',
    padding: '20px 5px'
  }

  const currentCity = useSelector(state => state.weatherDetails?.currentLocation)

  const dispatch = useDispatch()

  const getLocation = async({latLongPair}) => {
    console.log(latLongPair, 'latLongPair')
    let requestParams = {
        apikey,
        q: latLongPair,
        language: 'en-us'
    }
    try {
      // const res = (
      //   `${BASE_URL}${END_POINT.LOCATIONS}/v1/cities/geoposition/search`, 
      //   setParams(requestParams)
      //   )
      const res = await axios.get(
        `${BASE_URL}${END_POINT.LOCATIONS}/v1/cities/geoposition/search`, 
        setParams(requestParams)
        )
      console.log(res,'res')
    // const res = null
      if(res?.status === 200){
        console.log(res.data, 'res.data')
          return res.data
      }
    } catch (error) {
        return 'error'
    }
  }

  const getCurrentCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
      async function(position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      // send request to the accuweather locationKey api to receive the locationKey
      let myLocation = await getLocation({
        latLongPair: `${position.coords.latitude},${position.coords.longitude}`
      })// {'\u00b0'}
      // console.log(`${position.coords.latitude {\&#44} position.coords.longitude`}}, 'fggggggggg')
      if(myLocation){
        dispatch(weatherActions.setCurrentLocation({
          key: myLocation.Key, 
          city: myLocation.AdministrativeArea?.EnglishName,
          country: myLocation.Country?.EnglishName
        }))
      }
    },
      function(error) {
        console.error("Error Code = " + error.code + " - " + error.message); 
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

      // getCurrentCoordinates()
      dispatch(weatherActions.setCurrentLocation({
        key: 215854, 
        city: "Tel Aviv",
        country: "Israel"
      }))
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
    <div style={containerStyle}>
      <Routes>
          <Route path='/*' element={<Navigate replace to='/home'/>}/>
          <Route path='/home' element={<WeatherPage/>} />
          <Route path='/favorites' element={<FavoritesPage/>} />
      </Routes>
    </div>
    </div>
    </StyledEngineProvider>
    </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;