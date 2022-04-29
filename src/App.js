import React, { useEffect,useMemo } from 'react'
import {Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import WeatherPage from './pages/WeatherPage'
import FavoritesPage from './pages/FavoritesPage'
import { useSelector } from 'react-redux'
import Topbar from './components/navigations/Navbar'
import SimplePopper from './components/PopperComp'
import { createTheme, ThemeProvider} from '@mui/material/styles';
import { amber, deepOrange, grey } from '@mui/material/colors';
import CssBaseline from "@mui/material/CssBaseline";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import DayBackground from './assets/images/day.jpg'
import NightBackground from './assets/images/night1.jpg'

const getDesignTokens = (mode) =>({
  typography: {
    fontFamily: 'Montserrat',
    // fontWeight: 500,
    // h6: {
    //   color: '#B6B6B6',
    //   fontSize: 12,
    //   fontWeight: 300
    // },
    // h5: {
    //   color: '#FFFFFF',
    //   fontSize: 12,
    //   fontWeight: 300
    // },
    // leave
    h4: {
      fontSize: 39    
    },
    // leave
    h3: {
      fontSize: 34
    },
    h2: {
      fontSize: 29,
      fontWeight: 500
    },
    h1: {
      fontSize: 24,
      fontWeight: 400
    },
    subtitle1: {
      fontSize: 22
    },
    subtitle2: {
      fontSize: 19,
      fontWeight: 400
    },  
    body2: {
      fontSize: 18
    },
    // leave
    caption: {
      fontSize: 11,
      color: '#FBFBFB',
      fontFamily: "'Ubuntu', sans-serif",
      fontWeight: 400
    },
  },
  palette: {
    mode,
    // primary: {
    //   ...amber,
    //   ...(mode === "dark"
    //     ? {
    //         main: amber[300]
    //       }
    //     : { 
    //       main: amber[300] 
    //     })
    // },
      background: {
      ...(mode === "dark"? {
        default: '#171717',
        paper: '#171717',
        container: '#171717eb'
      }: {
        // default: '#113743',
        default: '#1f576e',
        // paper: '#113743',
        paper: '#1f576e',
        container: '#577e972b'
      })
    },
    text: {
      ...(mode === "dark"
        ? {
            primary: '#969E9F',
            secondary: '#969E9F'
        }
        : 
        {
            // primary: "#FFFFFF40",
            primary: "#d7d4d4",
            // secondary: '#FFFFFF40'
            secondary: '#d7d4d4'
          })
    },
  
  },
  shape: {
      borderRadius: 1
    }
})

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
  console.log(theme, 'isDayTime')

  return (
    <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
    <StyledEngineProvider injectFirst>
    <CssBaseline/>
    <div className="App">
    <Topbar ColorModeContext={ColorModeContext}/>
    <div style={{marginTop: 69,
      height: 'calc(100vh - 70px)', 
      overflow: 'auto',
      backgroundImage:`url(${backgroundImage})`,
      backgroundPosition: isDayTime?'0% 45%' : '0% 0%', 
      backgroundSize: 'cover'
    }}>
      <Routes>
          <Route path='/*' element={<Navigate replace to='/home'/>}/>
          <Route path='/home' element={<WeatherPage/>} />
          <Route path='/favorites-current-weather' element={<FavoritesPage/>} />
      </Routes>
    </div>
    </div>
    </StyledEngineProvider>
    </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;