import React, { useEffect, useState, useCallback, memo } from "react";
import { Grid, TextField, Popper, Typography, Menu, MenuItem, Popover, Box, Button,InputAdornment, List, ListItem } from '@mui/material'
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
  // const [anchorEl, setAnchorEl] = useState(null)
  const [resultIndex, setResultIndex] = useState(0)
  const [searchResults, setSearchResults] = useState([
    {
        "Version": 1,
        "Key": "226396",
        "Type": "City",
        "Rank": 10,
        "LocalizedName": "Tokyo",
        "Country": {
            "ID": "JP",
            "LocalizedName": "Japan"
        },
        "AdministrativeArea": {
            "ID": "13",
            "LocalizedName": "Tokyo"
        }
    },
    {
        "Version": 1,
        "Key": "106770",
        "Type": "City",
        "Rank": 11,
        "LocalizedName": "Taiyuan",
        "Country": {
            "ID": "CN",
            "LocalizedName": "China"
        },
        "AdministrativeArea": {
            "ID": "SX",
            "LocalizedName": "Shanxi"
        }
    },
    {
        "Version": 1,
        "Key": "106780",
        "Type": "City",
        "Rank": 11,
        "LocalizedName": "Tianjin",
        "Country": {
            "ID": "CN",
            "LocalizedName": "China"
        },
        "AdministrativeArea": {
            "ID": "TJ",
            "LocalizedName": "Tianjin"
        }
    },
    {
        "Version": 1,
        "Key": "58491",
        "Type": "City",
        "Rank": 13,
        "LocalizedName": "Tongren",
        "Country": {
            "ID": "CN",
            "LocalizedName": "China"
        },
        "AdministrativeArea": {
            "ID": "GZ",
            "LocalizedName": "Guizhou"
        }
    },
    {
        "Version": 1,
        "Key": "102324",
        "Type": "City",
        "Rank": 13,
        "LocalizedName": "Tangshan",
        "Country": {
            "ID": "CN",
            "LocalizedName": "China"
        },
        "AdministrativeArea": {
            "ID": "HE",
            "LocalizedName": "Hebei"
        }
    },
    {
        "Version": 1,
        "Key": "59573",
        "Type": "City",
        "Rank": 13,
        "LocalizedName": "Taizhou",
        "Country": {
            "ID": "CN",
            "LocalizedName": "China"
        },
        "AdministrativeArea": {
            "ID": "JS",
            "LocalizedName": "Jiangsu"
        }
    },
    {
        "Version": 1,
        "Key": "60198",
        "Type": "City",
        "Rank": 13,
        "LocalizedName": "Tongliao",
        "Country": {
            "ID": "CN",
            "LocalizedName": "China"
        },
        "AdministrativeArea": {
            "ID": "NM",
            "LocalizedName": "Inner Mongolia"
        }
    },
    {
        "Version": 1,
        "Key": "106571",
        "Type": "City",
        "Rank": 13,
        "LocalizedName": "Tai'an",
        "Country": {
            "ID": "CN",
            "LocalizedName": "China"
        },
        "AdministrativeArea": {
            "ID": "SD",
            "LocalizedName": "Shandong"
        }
    },
    {
        "Version": 1,
        "Key": "58055",
        "Type": "City",
        "Rank": 15,
        "LocalizedName": "Tianshui",
        "Country": {
            "ID": "CN",
            "LocalizedName": "China"
        },
        "AdministrativeArea": {
            "ID": "GS",
            "LocalizedName": "Gansu"
        }
    },
    {
        "Version": 1,
        "Key": "2333653",
        "Type": "City",
        "Rank": 15,
        "LocalizedName": "Taizhou",
        "Country": {
            "ID": "CN",
            "LocalizedName": "China"
        },
        "AdministrativeArea": {
            "ID": "ZJ",
            "LocalizedName": "Zhejiang"
        }
    }
])
  const [open, setOpen] = useState(true)
  const dispatch = useDispatch()

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
    // {open && setOpen(false)}
    
    // console.log(locationKey,'locationKey')
    setSearchTerm(chosenItem?.LocalizedName)
    dispatch(weatherActions.setCurrentLocation({
      key: chosenItem?.Key, 
      city: chosenItem?.LocalizedName,
      country: chosenItem.Country?.LocalizedName
    }))
  }

  const AllList = ({result, index}) => (
    <CustomizedListItem 
      style={{backgroundColor: (index + 1) === resultIndex && '#FFFFFF40'}}
      id={`autocompletelistItem${index}`}  
      onClick={() => handleChooseCity(result)}  
      onKeyDown={handleKeyDown}>
      {result.LocalizedName}
    </CustomizedListItem> 
  )

  const MemoisedList = React.memo(AllList)

  
  const ResultsList = ()=> {

    return (
       <CustomizedBox
       tabIndex='0' id='dropdownList'>
         <CustomizedGrid container>
         <List>
          {searchResults && searchResults.length? searchResults.map((result, index) => ( 
            <MemoisedList result={result} index={index}/>      
          )):
            <CustomizedListItem>No options</CustomizedListItem>}
          </List>
          </CustomizedGrid>
          
      </CustomizedBox>
    )
  }

  const MemoisedListBox = React.memo(ResultsList)

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
        // return;
        setResultIndex(searchResults.length)
      }else{
      console.log('38')
      // console.log(searchResults[0], '111111')
      setResultIndex(resultIndex - 1);
      }
    }
    // DOWN ARROW
    else if (e.keyCode === 40) {
      console.log('40')
      if (resultIndex === searchResults.length) {
        // return;
        setResultIndex(1)
      }else{
      setResultIndex(resultIndex + 1);
      }
    }
    // ENTER
    else if (e.keyCode === 13) {
      console.log('13')
      // setSearchTerm(searchResults[resultIndex])
      // verify(searchResults[resultIndex - 1].LocalizedName)
      handleChooseCity(searchResults[resultIndex - 1])
      console.log(searchResults[resultIndex - 1].LocalizedName,'searchResults[resultIndex]')
      setOpen(false)
      setSearchTerm('')
      
      // setValue(suggestions[resultIndex]);
      setResultIndex(0);
      // setSuggestionsActive(false);
    }
  };
  console.log(resultIndex)


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
    onChange={e => setSearchTerm(e.target.value)} 
    value={searchTerm}
    onKeyDown={handleKeyDown}
    placeholder="Search by city"
    InputProps={{
      id: "search-autocomplete",
    //   startAdornment: (<InputAdornment>
    //     <Grid container style={{ width: 31, height: 27 }} justifyContent='center' alignItems='center'>
    //       {!select ? <div style={{ width: 31, height: 27, backgroundColor: '#F5F5F5' }}></div> :
    //         select && select.type === 'enigma' ? <IconEnigma name={select && select.title} size='18px' /> :
    //           <Icon name={select && select.title} size='25px' />
    //       }
    //     </Grid>
    //   </InputAdornment>),
      endAdornment: (
        <InputAdornment>
          <SearchIcon/>
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
// const ResultsList = function (props) {

  //   return (
  //     <Popper id={id} open={open} anchorEl={anchorEl}
  //       // {...props}
  //       // role='Popper'
  //       // style={{ width: '100%', zIndex: 1500,backgroundColor: 'yellow', inset: '0px auto auto 0px' }}
  //       placement='bottom-start'
  //       transition
  //       disablePortal
  //       modifiers={{
  //         flip: {
  //           enabled: false,
  //         },
  //         offset: {
  //           enabled: true,
  //           offset: '300,100',
  //         },
  //       }}
  //     >
  //      <Box>
  //         {searchResults && searchResults.map(result => (
  //           <Grid item>
  //             <Typography>{result.LocalizedName}</Typography>
  //           </Grid>
  //         ))}
  //           {/* <MemoisedList groupedNames={Array.from(groupedNames.keys())} enigmaIconsName={enigmaIconsName} setSelectName={setSelectName} /> */}
  //     </Box>
  //     </Popper>
  //   )
  // }