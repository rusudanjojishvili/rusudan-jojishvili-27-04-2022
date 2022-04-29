import React from 'react'
import { Grid, Typography, IconButton } from '@mui/material'
import { parseISO, format } from 'date-fns'
import Image from '../utils/PNGIcon'
import { forecastItem } from '../styles/WeatherStyleSXConstants'

function DailyForecastItem({forecast}) {
  return (
    <Grid item>
        <Grid container sx={forecastItem} direction='column'>
        <Grid item>
            <Typography variant='h1'>{format(parseISO(forecast?.Date), 'EEE d')}</Typography>
        </Grid>
        <Grid item sx={{mt:1}}>
          <Image fileName={forecast?.Day?.Icon} size={70}/>        
        </Grid>

        <Grid item>
            <Grid container alignItems='flex-end' justifyContent='space-evenly'>
            <Typography style={{fontSize: 30, lineHeight: 1.1}}>{forecast?.Temperature?.Maximum?.Value}{'\u00b0'}</Typography>
            <Typography style={{fontSize: 15}}>{forecast?.Temperature?.Minimum?.Value}{'\u00b0'}</Typography>
            </Grid>
        </Grid>
        <Typography variant='subtitle2'>{forecast?.Day?.IconPhrase}</Typography>
        </Grid>
    </Grid>
  )
}

export default DailyForecastItem