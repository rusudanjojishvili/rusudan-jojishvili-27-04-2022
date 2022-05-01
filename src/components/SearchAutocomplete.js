import React, { useEffect, useState, useCallback, memo, createRef } from "react";
import { Grid, InputAdornment, List, CircularProgress } from '@mui/material'
import { debounce } from '../utils/helperFunctions'
import { useSelector, useDispatch } from 'react-redux'
import * as weatherActions from '../redux/weatherSlice'
import axios from 'axios'
import { BASE_URL, END_POINT, apikey } from '../utils/constants'
import { setParams } from '../utils/setParams'
import { CustomizedTextField, CustomizedBox,CustomizedGrid, CustomizedListItem } from '../styles/StyledComponents'
import SearchIcon from '@mui/icons-material/Search'
import * as snackbarActions from '../redux/snackbarSlice';


function SearchAutocomplete() {
  const [searchTerm, setSearchTerm] = useState("");
  const [resultIndex, setResultIndex] = useState(0)
  const [searchResults, setSearchResults] = useState(null)
  const [open, setOpen] = useState(true)
  const dispatch = useDispatch()

  const arrLength = searchResults?.length
  const [elRefs, setElRefs] = React.useState([])

  useEffect(() => {
    // add ref to each of the search result
    setElRefs((elRefs) =>
      Array(arrLength)
        .fill()
        .map((_, i) => elRefs[i] || createRef())
    )
  }, [arrLength])

  

  const chosenCity = useSelector( state => state.weatherDetails?.currentLocation)

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
          setSearchResults(res.data)
      }
    } catch (error) {
      dispatch(snackbarActions.setSnackBar('error', 'Error loading data', 3000));
    }
  }

  const handleChooseCity = (chosenItem) => {
    setSearchTerm(chosenItem?.LocalizedName)
    dispatch(weatherActions.setCurrentLocation({
      key: chosenItem?.Key, 
      city: chosenItem?.LocalizedName,
      country: chosenItem.Country?.LocalizedName
    }))
  }

  
  const AllList = () => (
    searchResults.map((result, index) => ( 
    <CustomizedListItem 
      ref={elRefs[index]}
      key={index}
      style={{backgroundColor: (index + 1) === resultIndex && '#FFFFFF40'}}
      id={`autocompletelistItem${index}`}  
      onClick={() => handleChooseCity(result)}  
      onKeyDown={handleKeyDown}>
      {result.LocalizedName}
    </CustomizedListItem> 
    ))
  )

  const MemoisedList = React.memo(AllList)

  
  const ResultsList = ()=> {

    return (
       <CustomizedBox
       tabIndex='0' id='dropdownList'>
         <CustomizedGrid container>
         {searchResults?
         <List>
          {searchResults.length? 
            <MemoisedList/>
          :
            <CustomizedListItem>No options</CustomizedListItem>}
          </List>:
           <Grid item xs={12} sx={{height: '100%'}}>
             <Grid container justifyContent='center' alignItems='center' sx={{height: '100%'}}>
              <CircularProgress sx={{ color: '#FFFFFF'}} />
             </Grid>
           </Grid>
         }
          </CustomizedGrid>
          
      </CustomizedBox>
    )
  }

  const MemoisedListBox = React.memo(ResultsList)

  const handleChangeInput = (e) => {
    let value = e.target.value

    value = value.replace(/[^A-Za-z]/ig, '')
    setSearchTerm(value)
  }

  useEffect(() => {
    if (searchTerm !== "") {
      verify(searchTerm);
       {!open && setOpen(true)}
    }
  }, [searchTerm]);

  const verify = useCallback(
    debounce(name => {
     
      // send request to the server
      searchByCity(name)
    }, 200),
    []
  );


  const handleKeyDown = (e) => {
    // UP ARROW
    if (e.keyCode === 38) {
      if (resultIndex === 0 || resultIndex === 1) {
        setResultIndex(searchResults.length)
      }else{
        setResultIndex(resultIndex - 1)
      }
    }
    // DOWN ARROW
    else if (e.keyCode === 40) {
      if (resultIndex === searchResults.length) {
        setResultIndex(1)
      }else{
        setResultIndex(resultIndex + 1)
      }
    }
    // ENTER
    else if (e.keyCode === 13) {
      handleChooseCity(searchResults[resultIndex - 1])
      setOpen(false)
      setSearchTerm('')
      setResultIndex(0)
    }
  };
  useEffect(() => {
    if(resultIndex){
      elRefs[resultIndex-1].current.scrollIntoView({ block: 'nearest', inline: 'start' })
    }
  }, [resultIndex])
  
  // console.log(resultIndex)


  useEffect(() => {
    const handleClose = (e) => {
      if(e.target && (e.target.id === 'dropdownList' || e.target.id === 'search-autocomplete')) return
      else {
        open && setOpen(false)
        setResultIndex(0)
      }
  
    }
    document.body.addEventListener("click", handleClose)

    return () => {
      document.body.addEventListener("click", handleClose)
    };
  }, []);

  return (
    <Grid item style={{ position: "relative", width: '100%'}} >
    <CustomizedTextField
    size='small' 
    autoComplete='off'
    fullWidth
    onClick={() => !open && searchTerm && setOpen(true)}
    onChange={handleChangeInput} 
    value={searchTerm}
    onKeyDown={handleKeyDown}
    placeholder="Search by city"
    InputProps={{
      id: "search-autocomplete",
      endAdornment: (
        <InputAdornment position='end'>
          <SearchIcon sx={{color:'#FFFFFF'}}/>
        </InputAdornment>
      )
    }}

    required
  />
  {searchTerm !== '' && open && <MemoisedListBox />}
    </Grid>
  )
}

export default memo(SearchAutocomplete)
