import React, { useEffect } from 'react'
import {Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import WeatherPage from './components/WeatherPage'
import FavoritesPage from './components/FavoritesPage'
import { useSelector } from 'react-redux'
import SearchAutocomplete from './components/SearchAutocomplete'

function App() {


  return (
    <div className="App">
    <SearchAutocomplete/>
    <div style={{marginTop: 50}}>
      <Routes>
          <Route path='/*' element={<Navigate replace to='/local-forecast'/>}/>
          <Route path='/local-forecast' element={<WeatherPage/>} />
          <Route path='/favorites-current-weather' element={<FavoritesPage/>} />
      </Routes>
    </div>
    </div>
  );
}

export default App;