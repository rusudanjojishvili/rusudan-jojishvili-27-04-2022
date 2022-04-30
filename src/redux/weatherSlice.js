import axios from 'axios'
import { createSlice } from '@reduxjs/toolkit'
import { BASE_URL, END_POINT, apikey } from '../utils/constants'
import { setParams } from '../utils/setParams'
import * as snackbarActions from './snackbarSlice';

export const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        currentLocation: null,
        temperatureType: 'Metric',
        currentWeather: {
            "LocalObservationDateTime": "2022-04-28T11:53:00+03:00",
            "EpochTime": 1651135980,
            "WeatherText": "Sunny",
            "WeatherIcon": 1,
            "HasPrecipitation": false,
            "PrecipitationType": null,
            "IsDayTime": true,
            "Temperature": {
              "Metric": {
                "Value": 20.7,
                "Unit": "C",
                "UnitType": 17
              },
              "Imperial": {
                "Value": 69,
                "Unit": "F",
                "UnitType": 18
              }
            },
            "RealFeelTemperature": {
              "Metric": {
                "Value": 24.2,
                "Unit": "C",
                "UnitType": 17,
                "Phrase": "Pleasant"
              },
              "Imperial": {
                "Value": 76,
                "Unit": "F",
                "UnitType": 18,
                "Phrase": "Pleasant"
              }
            },
            "RealFeelTemperatureShade": {
              "Metric": {
                "Value": 19.2,
                "Unit": "C",
                "UnitType": 17,
                "Phrase": "Pleasant"
              },
              "Imperial": {
                "Value": 67,
                "Unit": "F",
                "UnitType": 18,
                "Phrase": "Pleasant"
              }
            },
            "RelativeHumidity": 61,
            "IndoorRelativeHumidity": 61,
            "DewPoint": {
              "Metric": {
                "Value": 12.9,
                "Unit": "C",
                "UnitType": 17
              },
              "Imperial": {
                "Value": 55,
                "Unit": "F",
                "UnitType": 18
              }
            },
            "Wind": {
              "Direction": {
                "Degrees": 315,
                "Localized": "NW",
                "English": "NW"
              },
              "Speed": {
                "Metric": {
                  "Value": 12.2,
                  "Unit": "km/h",
                  "UnitType": 7
                },
                "Imperial": {
                  "Value": 7.6,
                  "Unit": "mi/h",
                  "UnitType": 9
                }
              }
            },
            "WindGust": {
              "Speed": {
                "Metric": {
                  "Value": 25.6,
                  "Unit": "km/h",
                  "UnitType": 7
                },
                "Imperial": {
                  "Value": 15.9,
                  "Unit": "mi/h",
                  "UnitType": 9
                }
              }
            },
            "UVIndex": 7,
            "UVIndexText": "High",
            "Visibility": {
              "Metric": {
                "Value": 16.1,
                "Unit": "km",
                "UnitType": 6
              },
              "Imperial": {
                "Value": 10,
                "Unit": "mi",
                "UnitType": 2
              }
            },
            "ObstructionsToVisibility": "",
            "CloudCover": 4,
            "Ceiling": {
              "Metric": {
                "Value": 9144,
                "Unit": "m",
                "UnitType": 5
              },
              "Imperial": {
                "Value": 30000,
                "Unit": "ft",
                "UnitType": 0
              }
            },
            "Pressure": {
              "Metric": {
                "Value": 1010.8,
                "Unit": "mb",
                "UnitType": 14
              },
              "Imperial": {
                "Value": 29.85,
                "Unit": "inHg",
                "UnitType": 12
              }
            },
            "PressureTendency": {
              "LocalizedText": "Steady",
              "Code": "S"
            },
            "Past24HourTemperatureDeparture": {
              "Metric": {
                "Value": -2.9,
                "Unit": "C",
                "UnitType": 17
              },
              "Imperial": {
                "Value": -5,
                "Unit": "F",
                "UnitType": 18
              }
            },
            "ApparentTemperature": {
              "Metric": {
                "Value": 19.4,
                "Unit": "C",
                "UnitType": 17
              },
              "Imperial": {
                "Value": 67,
                "Unit": "F",
                "UnitType": 18
              }
            },
            "WindChillTemperature": {
              "Metric": {
                "Value": 20.6,
                "Unit": "C",
                "UnitType": 17
              },
              "Imperial": {
                "Value": 69,
                "Unit": "F",
                "UnitType": 18
              }
            },
            "WetBulbTemperature": {
              "Metric": {
                "Value": 16.1,
                "Unit": "C",
                "UnitType": 17
              },
              "Imperial": {
                "Value": 61,
                "Unit": "F",
                "UnitType": 18
              }
            },
            "Precip1hr": {
              "Metric": {
                "Value": 0,
                "Unit": "mm",
                "UnitType": 3
              },
              "Imperial": {
                "Value": 0,
                "Unit": "in",
                "UnitType": 1
              }
            },
            "PrecipitationSummary": {
              "Precipitation": {
                "Metric": {
                  "Value": 0,
                  "Unit": "mm",
                  "UnitType": 3
                },
                "Imperial": {
                  "Value": 0,
                  "Unit": "in",
                  "UnitType": 1
                }
              },
              "PastHour": {
                "Metric": {
                  "Value": 0,
                  "Unit": "mm",
                  "UnitType": 3
                },
                "Imperial": {
                  "Value": 0,
                  "Unit": "in",
                  "UnitType": 1
                }
              },
              "Past3Hours": {
                "Metric": {
                  "Value": 0,
                  "Unit": "mm",
                  "UnitType": 3
                },
                "Imperial": {
                  "Value": 0,
                  "Unit": "in",
                  "UnitType": 1
                }
              },
              "Past6Hours": {
                "Metric": {
                  "Value": 0,
                  "Unit": "mm",
                  "UnitType": 3
                },
                "Imperial": {
                  "Value": 0,
                  "Unit": "in",
                  "UnitType": 1
                }
              },
              "Past9Hours": {
                "Metric": {
                  "Value": 0,
                  "Unit": "mm",
                  "UnitType": 3
                },
                "Imperial": {
                  "Value": 0,
                  "Unit": "in",
                  "UnitType": 1
                }
              },
              "Past12Hours": {
                "Metric": {
                  "Value": 0,
                  "Unit": "mm",
                  "UnitType": 3
                },
                "Imperial": {
                  "Value": 0,
                  "Unit": "in",
                  "UnitType": 1
                }
              },
              "Past18Hours": {
                "Metric": {
                  "Value": 0,
                  "Unit": "mm",
                  "UnitType": 3
                },
                "Imperial": {
                  "Value": 0,
                  "Unit": "in",
                  "UnitType": 1
                }
              },
              "Past24Hours": {
                "Metric": {
                  "Value": 0,
                  "Unit": "mm",
                  "UnitType": 3
                },
                "Imperial": {
                  "Value": 0,
                  "Unit": "in",
                  "UnitType": 1
                }
              }
            },
            "TemperatureSummary": {
              "Past6HourRange": {
                "Minimum": {
                  "Metric": {
                    "Value": 16,
                    "Unit": "C",
                    "UnitType": 17
                  },
                  "Imperial": {
                    "Value": 61,
                    "Unit": "F",
                    "UnitType": 18
                  }
                },
                "Maximum": {
                  "Metric": {
                    "Value": 20.7,
                    "Unit": "C",
                    "UnitType": 17
                  },
                  "Imperial": {
                    "Value": 69,
                    "Unit": "F",
                    "UnitType": 18
                  }
                }
              },
              "Past12HourRange": {
                "Minimum": {
                  "Metric": {
                    "Value": 16,
                    "Unit": "C",
                    "UnitType": 17
                  },
                  "Imperial": {
                    "Value": 61,
                    "Unit": "F",
                    "UnitType": 18
                  }
                },
                "Maximum": {
                  "Metric": {
                    "Value": 20.7,
                    "Unit": "C",
                    "UnitType": 17
                  },
                  "Imperial": {
                    "Value": 69,
                    "Unit": "F",
                    "UnitType": 18
                  }
                }
              },
              "Past24HourRange": {
                "Minimum": {
                  "Metric": {
                    "Value": 16,
                    "Unit": "C",
                    "UnitType": 17
                  },
                  "Imperial": {
                    "Value": 61,
                    "Unit": "F",
                    "UnitType": 18
                  }
                },
                "Maximum": {
                  "Metric": {
                    "Value": 24.6,
                    "Unit": "C",
                    "UnitType": 17
                  },
                  "Imperial": {
                    "Value": 76,
                    "Unit": "F",
                    "UnitType": 18
                  }
                }
              }
            },
            "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us",
            "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us"
          },
        fiveDayForecast: [
              {
                "Date": "2022-04-27T07:00:00+03:00",
                "EpochDate": 1651032000,
                "Temperature": {
                  "Minimum": {
                    "Value": 63,
                    "Unit": "F",
                    "UnitType": 18
                  },
                  "Maximum": {
                    "Value": 74,
                    "Unit": "F",
                    "UnitType": 18
                  }
                },
                "Day": {
                  "Icon": 6,
                  "IconPhrase": "Mostly cloudy",
                  "HasPrecipitation": false
                },
                "Night": {
                  "Icon": 38,
                  "IconPhrase": "Mostly cloudy",
                  "HasPrecipitation": false
                },
                "Sources": [
                  "AccuWeather"
                ],
                "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&lang=en-us",
                "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&lang=en-us"
              },
              {
                "Date": "2022-04-28T07:00:00+03:00",
                "EpochDate": 1651118400,
                "Temperature": {
                  "Minimum": {
                    "Value": 63,
                    "Unit": "F",
                    "UnitType": 18
                  },
                  "Maximum": {
                    "Value": 72,
                    "Unit": "F",
                    "UnitType": 18
                  }
                },
                "Day": {
                  "Icon": 1,
                  "IconPhrase": "Sunny",
                  "HasPrecipitation": false
                },
                "Night": {
                  "Icon": 34,
                  "IconPhrase": "Mostly clear",
                  "HasPrecipitation": false
                },
                "Sources": [
                  "AccuWeather"
                ],
                "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&lang=en-us",
                "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&lang=en-us"
              },
              {
                "Date": "2022-04-29T07:00:00+03:00",
                "EpochDate": 1651204800,
                "Temperature": {
                  "Minimum": {
                    "Value": 73,
                    "Unit": "F",
                    "UnitType": 18
                  },
                  "Maximum": {
                    "Value": 76,
                    "Unit": "F",
                    "UnitType": 18
                  }
                },
                "Day": {
                  "Icon": 1,
                  "IconPhrase": "Sunny",
                  "HasPrecipitation": false
                },
                "Night": {
                  "Icon": 35,
                  "IconPhrase": "Partly cloudy",
                  "HasPrecipitation": false
                },
                "Sources": [
                  "AccuWeather"
                ],
                "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&lang=en-us",
                "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&lang=en-us"
              },
              {
                "Date": "2022-04-30T07:00:00+03:00",
                "EpochDate": 1651291200,
                "Temperature": {
                  "Minimum": {
                    "Value": 69,
                    "Unit": "F",
                    "UnitType": 18
                  },
                  "Maximum": {
                    "Value": 82,
                    "Unit": "F",
                    "UnitType": 18
                  }
                },
                "Day": {
                  "Icon": 2,
                  "IconPhrase": "Mostly sunny",
                  "HasPrecipitation": false
                },
                "Night": {
                  "Icon": 33,
                  "IconPhrase": "Clear",
                  "HasPrecipitation": false
                },
                "Sources": [
                  "AccuWeather"
                ],
                "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&lang=en-us",
                "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&lang=en-us"
              },
              {
                "Date": "2022-05-01T07:00:00+03:00",
                "EpochDate": 1651377600,
                "Temperature": {
                  "Minimum": {
                    "Value": 66,
                    "Unit": "F",
                    "UnitType": 18
                  },
                  "Maximum": {
                    "Value": 71,
                    "Unit": "F",
                    "UnitType": 18
                  }
                },
                "Day": {
                  "Icon": 3,
                  "IconPhrase": "Partly sunny",
                  "HasPrecipitation": false
                },
                "Night": {
                  "Icon": 36,
                  "IconPhrase": "Intermittent clouds",
                  "HasPrecipitation": false
                },
                "Sources": [
                  "AccuWeather"
                ],
                "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=5&lang=en-us",
                "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=5&lang=en-us"
              }
            ],
        favorites: []
    },
    reducers: {
        setCurrentWeather: (state, action) => {
            state.currentWeather = action.payload
        },
        setFiveDateForecast: (state, action) => {
            state.fiveDayForecast = action.payload
        },
        setCurrentLocation:(state, action) => {
            console.log(action.payload, 'action.payload')
            state.currentLocation = action.payload
        },
        addToFavorites: (state, action) => {
            const favoritesCopy = [...state.favorites]
            const favoriteIndex = favoritesCopy.findIndex(favorite =>favorite.id === action.payload.id)
            if(favoriteIndex === -1){
                favoritesCopy.push(action.payload)
            }else{
                favoritesCopy.splice(favoriteIndex, 1)
            }
            state.favorites = favoritesCopy
        }
    }
})

export const getCurrentWeather = (locationId) => async(dispatch) => {
    let requestParams = {
        apikey,
        language: 'en-us',
        details: true
    }

    try {
      const res = await axios.get(`${BASE_URL}${END_POINT.CURRENT_CONDITIONS}/v1/${locationId}`, 
      setParams(requestParams))
    // const res = null
      if(res?.status === 200 && res?.data?.length){
        dispatch(setCurrentWeather(res.data[0]))
      }
    } catch (error) {
        dispatch(snackbarActions.setSnackBar('error', 'Error loading data', 3000));
    }
}

export const getFiveDayForecast= (locationId) => async(dispatch) => {
    let requestParams = {
        apikey,
        language: 'en-us',
        details: false,
        matric: true
    }
    try {
      const res = await axios.get(
        `${BASE_URL}${END_POINT.FORECASTS}/v1/daily/5day/${locationId}`, 
        setParams(requestParams)
        )
    // const res = null
      if(res.status === 200){
          dispatch(setFiveDateForecast(res?.data?.DailyForecasts))
      }
    } catch (error) {
      dispatch(snackbarActions.setSnackBar('error', 'Error loading Forecast data', 3000));
    }
}
// export const searchByCity= (searchTerm) => async(dispatch) => {
//     let requestParams = {
//         apikey,
//         q: searchTerm,
//         language: 'en-us'
//     }
//     try {
//       const res = await axios.get(
//         `${BASE_URL}${END_POINT.LOCATIONS}/v1/cities/autocomplete`, 
//         setParams(requestParams)
//         )
//     // const res = null
//       if(res.status === 200){
//           console.log(res, 'res search')
//       }
//     } catch (error) {

//     }
// }


export const {
    setCurrentWeather,
    setFiveDateForecast,
    setCurrentLocation,
    addToFavorites
} = weatherSlice.actions

export default weatherSlice.reducer


