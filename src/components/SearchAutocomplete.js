import React, { useEffect, useState, useCallback } from "react";
import { Grid, TextField, Popper, Typography, Menu, MenuItem, Popover, Box, Button,InputAdornment, List, ListItem } from '@mui/material'
import { debounce } from '../utils/helperFunctions'
import { useSelector, useDispatch } from 'react-redux'
import * as weatherActions from '../redux/weatherSlice'
import axios from 'axios'
import { BASE_URL, END_POINT, apikey } from '../utils/constants'
import { setParams } from '../utils/setParams'
import { CustomizedTextField, CustomizedBox,CustomizedGrid } from '../styles/StyledComponents'
import SearchIcon from '@mui/icons-material/Search'


function SearchAutocomplete() {
  const [searchTerm, setSearchTerm] = useState("");
  // const [anchorEl, setAnchorEl] = useState(null)
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


  
  const ResultsList = ()=> {

    return (
       <CustomizedBox
       tabIndex='0' id='dropdownList'>
         <CustomizedGrid container>
          {searchResults && searchResults.map((result, index) => ( 
            <List>
            {/* <Grid item xs={12} style={{ cursor: 'pointer'}} onClick={() => handleChooseCity(result)}  onKeyDown={handleKeyDown}> */}
              {/* <Grid container justifyContent='flex-start'> */}
              <ListItem id={`autocompletelistItem${index}`} style={{ cursor: 'pointer'}} onClick={() => handleChooseCity(result)}  onKeyDown={handleKeyDown}>
                {result.LocalizedName}
              </ListItem> 
                {/* <Typography id={`autocompletelistItem${index}`}>{result.LocalizedName}</Typography> */}
              {/* </Grid> */}
            {/* </Grid> */}
            </List>
          ))}
          </CustomizedGrid>
            {/* <MemoisedList groupedNames={Array.from(groupedNames.keys())} enigmaIconsName={enigmaIconsName} setSelectName={setSelectName} /> */}
      </CustomizedBox>
    )
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
      // searchByCity(name)
    }, 200),
    []
  );


  const handleKeyDown = (e) => {
    // UP ARROW
    if (e.keyCode === 38) {
      // if (suggestionIndex === 0) {
      //   return;
      // }
      console.log('38')
      // setSuggestionIndex(suggestionIndex - 1);
    }
    // DOWN ARROW
    else if (e.keyCode === 40) {
      console.log('40')
      // if (suggestionIndex - 1 === suggestions.length) {
      //   return;
      // }
      // setSuggestionIndex(suggestionIndex + 1);
    }
    // ENTER
    else if (e.keyCode === 13) {
      console.log('13')

      // setValue(suggestions[suggestionIndex]);
      // setSuggestionIndex(0);
      // setSuggestionsActive(false);
    }
  };


  useEffect(() => {
    const handleClose = (e) => {
      if(e.target && (e.target.id === 'dropdownList' || e.target.id === 'search-autocomplete')) return
      else {open && setOpen(false)}
  
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
    onKeyDown={handleKeyDown}
    // onClick={handleClick}
    onChange={e => setSearchTerm(e.target.value)} 
    // aria-describedby={id}
    value={searchTerm}
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
  {searchTerm !== '' && open && <ResultsList />}
    </Grid>
  )
}

export default SearchAutocomplete
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