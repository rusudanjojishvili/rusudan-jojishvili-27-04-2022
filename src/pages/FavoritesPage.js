import React, { useEffect } from 'react'
import Favorite from '../components/Favorite'
import { useSelector, useDispatch } from 'react-redux'
import { Grid, Typography} from '@mui/material'
import { Link } from 'react-router-dom'
import * as weatherActions from '../redux/weatherSlice'
import { innerContainer } from '../styles/WeatherStyleSXConstants'
import { CustomizedButton } from '../styles/StyledComponents'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

function FavoritesPage() {
    const favorites = useSelector(state => state.weatherDetails?.favorites)
    const dispatch = useDispatch()  
    

    const setChosenFavorite = (chosenFavorite) => {
      dispatch(weatherActions.setCurrentLocation({
        key: chosenFavorite?.id, 
        city: chosenFavorite?.name,
        country: chosenFavorite.country
      }))
    }


  return (
    <Grid container sx={{minHeight: '100%'}} justifyContent='center' alignItems='center'>
      <Grid item xs={11} md={10} xl={9} style={{height: '100%'}}>
        <Grid container sx={{...innerContainer, height: '100%'}}>
         {favorites?.length?
          <Grid item xs={12}>
           <Grid container justifyContent='center'>
            <Typography variant='h3'>Favorites</Typography>
           </Grid>
            <Grid container spacing={2} justifyContent='center' sx={{ mt:2}}>
            {favorites.map((favoriteItem, index) =>{
              return (
                <Grid item key={index}>
                  <CustomizedButton component={Link} to='/home' onClick={() => setChosenFavorite(favoriteItem)}>
                    <Favorite favoriteItem={favoriteItem}/>
                  </CustomizedButton>
              </Grid>
            )})}
            </Grid>
          </Grid>:
          <Grid item xs={12}>
          <Grid container justifyContent='center' direction='column' alignItems='center'>
            <Typography variant='h3'>No favorites yet</Typography>
            <Typography variant='subtitle2' sx={{mt:2}}>Click the <FavoriteBorderIcon/> icon to keep track of your favourite city weather</Typography>
          </Grid>
          </Grid>
         } 
        </Grid>
      </Grid>
    </Grid>
  )
}

export default FavoritesPage
