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
      fontSize: 24
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
        default: 'red',
        paper: 'red'
      }: {
        default: '#1f576e',
        paper: '#1f576e'
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
  const [mode, setMode] = React.useState('dark');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);


  return (
    <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
    <CssBaseline/>
    <div className="App">
    <Topbar ColorModeContext={ColorModeContext}/>
    <div style={{marginTop: 68}}>
      <Routes>
          <Route path='/*' element={<Navigate replace to='/home'/>}/>
          <Route path='/home' element={<WeatherPage/>} />
          <Route path='/favorites-current-weather' element={<FavoritesPage/>} />
      </Routes>
    </div>
    </div>
    </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;