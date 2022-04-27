import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as weatherActions from '../redux/weatherSlice'

function FavoritesPage() {
    const currentWeather = useSelector(state => state.weatherDetails)
    const dispatch = useDispatch()  
    
    // useEffect(() => {
    //     dispatch(weatherActions.getCurrentWeather(215854))
    //   },[])

  return (
    <div>
      
    </div>
  )
}

export default FavoritesPage
