
export const BASE_URL = process.env.REACT_APP_BASE_URL + '/'

export const END_POINT = {
    CURRENT_CONDITIONS:'currentconditions',
    FORECASTS: 'forecasts',
    LOCATIONS: 'locations'
}
export const apikey = 'AnAVVmha9YFZ9Sh5FUUgxuidXTtAe932'

export const getDesignTokens = (mode) =>({
    typography: {
      fontFamily: 'Montserrat',
      // fontWeight: 500,
      // h6: {
      //   color: '#B6B6B6',
      //   fontSize: 12,
      //   fontWeight: 300
      // },
      h5: {
       fontSize: 28
      },
      h4: {
        fontSize: 32    
      },
      h3: {
        fontSize: 34
      },
      h2: {
        fontSize: 24,
        fontWeight: 500
      },
      h1: {
        fontSize: 20,
        fontWeight: 400
      },
      subtitle1: {
        fontSize: 22
      },
      subtitle2: {
        fontSize: 16,
        fontWeight: 400
      }, 
      // body1: {
      //   fontSize: 20
      // } ,
      body2: {
        fontSize: 16
      },
      // leave
      caption: {
        fontSize: 11,
        color: '#FBFBFB',
        fontFamily: "'Ubuntu', sans-serif",
        fontWeight: 400
      },
    },
    palette: {
      mode,
      // primary: {
      //   ...amber,
      //   ...(mode === "dark"
      //     ? {
      //         main: amber[300]
      //       }
      //     : { 
      //       main: amber[300] 
      //     })
      // },
        background: {
        ...(mode === "dark"? {
          default: '#171717',
          paper: '#171717',
          container: '#171717eb',
          hover: '#837a7a40'
        }: {
          // default: '#113743',
          default: '#1f576e',
          // paper: '#113743',
          paper: '#1f576e',
          container: '#577e972b',
          hover: '#837a7a40'
        })
      },
      text: {
        ...(mode === "dark"
          ? {
              primary: '#969E9F',
              secondary: '#969E9F'
          }
          : 
          {
              // primary: "#FFFFFF40",
              primary: "#d7d4d4",
              // secondary: '#FFFFFF40'
              secondary: '#d7d4d4'
            })
      },
    
    },
    shape: {
        borderRadius: 1
      }
  })

