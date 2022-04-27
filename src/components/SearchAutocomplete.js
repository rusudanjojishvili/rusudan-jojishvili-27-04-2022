import React, { useEffect, useState, useCallback } from "react";
import { Grid, TextField, Popper } from '@mui/material'
import { debounce } from '../utils/helperFunctions'
import { useDispatch } from 'react-redux'
import * as weatherActions from '../redux/weatherSlice'
import axios from 'axios'
import { BASE_URL, END_POINT, apikey } from '../utils/constants'
import { setParams } from '../utils/setParams'


function SearchAutocomplete() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(null)
  const dispatch = useDispatch()

  const searchByCity = async(searchTerm) => {
    let requestParams = {
        apikey,
        q: searchTerm,
        language: 'en-us'
    }
    try {
      const res = await axios.get(
        `${BASE_URL}${END_POINT.LOCATIONS}/v1/cities/autocomplete`, 
        setParams(requestParams)
        )
    // const res = null
      if(res?.status === 200){
          console.log(res, 'res search')
          setSearchResults(res.data)
      }
    } catch (error) {

    }
  }

  console.log(searchResults, 'searchResults')

  const ResultsList = function (props) {

    return (
      <Popper open={searchTerm !== ''} 
        // {...props}
        style={{ width: 250, zIndex: 1500, top: 50, backgroundColor: 'yellow' }}
        placement='bottom-start'
        transition
      >
        <Grid container  style={{ width: 250 }}>
          <Grid container>
          ddhhdhd
            {/* <MemoisedList groupedNames={Array.from(groupedNames.keys())} enigmaIconsName={enigmaIconsName} setSelectName={setSelectName} /> */}
          </Grid>
        </Grid>
      </Popper>
    )
  }
  useEffect(() => {
    if (searchTerm !== "") {
      verify(searchTerm);
    }
  }, [searchTerm]);

  const verify = useCallback(
    debounce(name => {
      // send request to the server
      searchByCity(name)
    //   dispatch(weatherActions.searchByCity(name))
      console.log(name);
    }, 200),
    []
  );

  return (
    <Grid>
    <TextField
    size='small'
    autoComplete='off'
    fullWidth
    id="Name"
    // onClick={handleClick}
    onChange={e => setSearchTerm(e.target.value)} 
    // onBlur={() => setAnchorEl(null)}
    value={searchTerm}
    placeholder="Icon"
    InputProps={{
      style: { paddingBottom: 3 },
    //   startAdornment: (<InputAdornment>
    //     <Grid container style={{ width: 31, height: 27 }} justifyContent='center' alignItems='center'>
    //       {!select ? <div style={{ width: 31, height: 27, backgroundColor: '#F5F5F5' }}></div> :
    //         select && select.type === 'enigma' ? <IconEnigma name={select && select.title} size='18px' /> :
    //           <Icon name={select && select.title} size='25px' />
    //       }
    //     </Grid>
    //   </InputAdornment>),
    //   endAdornment: (
    //     <InputAdornment>
    //       <MagnifingGlassIcon className={classes.magnifier} />
    //     </InputAdornment>
    //   )
    }}

    required
  />
  <ResultsList />
    </Grid>
  )
}

export default SearchAutocomplete
