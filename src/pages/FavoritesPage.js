import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Grid, Typography } from '@mui/material'
import { NavLink } from 'react-router-dom'
import * as weatherActions from '../redux/weatherSlice'

function FavoritesPage() {
    const favorites = useSelector(state => state.weatherDetails?.favorites)
    const dispatch = useDispatch()  
    
    // useEffect(() => {
    //     dispatch(weatherActions.getCurrentWeather(215854))
    //   },[])

    const setChosenFavorite = (chosenFavorite) => {
      dispatch(weatherActions.setCurrentLocation({
        key: chosenFavorite?.id, 
        city: chosenFavorite?.name,
        country: chosenFavorite.country
      }))
    }

  return (
    <Grid container>
      <Grid item xs={12}>
        {favorites?.length && favorites.map(favorite =>{
          return (
          <NavLink to='/home' onClick={() => setChosenFavorite(favorite)}><Typography>{favorite.name}</Typography></NavLink>
        )})}
      </Grid>
      
    </Grid>
  )
}

export default FavoritesPage
