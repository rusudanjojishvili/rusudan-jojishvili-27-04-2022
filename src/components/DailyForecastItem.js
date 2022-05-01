import React from 'react'
import { Grid, Typography, IconButton } from '@mui/material'
import { parseISO, format } from 'date-fns'
import Image from '../utils/PNGIcon'
import { forecastItem } from '../styles/WeatherStyleSXConstants'

function DailyForecastItem({forecast}) {
  return (
    <Grid item>
        <Grid container sx={forecastItem}>
        <Grid item xs={12}>
            <Typography sx={{fontSize: {xs: 14 , sm: 20}, fontWeight: {xs: 500 , sm: 400}}}>{format(parseISO(forecast?.Date), 'EEE d')}</Typography>
        </Grid>
        <Grid item xs={12} sx={{mt:1}}>
          <Image fileName={forecast?.Day?.Icon} size={50}/>        
        </Grid>
        <Grid item xs={12}>
            <Grid container alignItems='flex-end' justifyContent='center'>
            <Typography sx={{fontSize: { xs: '20px', sm: '28px' }, lineHeight: 1.1}}>{forecast?.Temperature?.Maximum?.Value}{'\u00b0'}</Typography>
            <Typography sx={{fontSize: '15px', ml: 2}}>{forecast?.Temperature?.Minimum?.Value}{'\u00b0'}</Typography>
            </Grid>
        </Grid>
        <Grid item xs={12} sx={{display: { xs: 'none', lg: 'block' }}}>
          <Typography style={{fontSize: 16}} sx={{mt:'10px'}}>{forecast?.Day?.IconPhrase}</Typography>
        </Grid>
        </Grid>
    </Grid>
  )
}

export default DailyForecastItem