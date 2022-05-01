
export const BASE_URL = process.env.REACT_APP_BASE_URL + '/'

export const END_POINT = {
    CURRENT_CONDITIONS:'currentconditions',
    FORECASTS: 'forecasts',
    LOCATIONS: 'locations'
}
// export const apikey = 'VGYzZ5LOPNl4qGfGYu6s4VbPqRtkZ7XI'
// export const apikey = '3IGuGfQ8aE7xhQ1V2CkC0RQJSTsAdriT'
export const apikey = 'AnAVVmha9YFZ9Sh5FUUgxuidXTtAe932'

// global theme definitions
export const getDesignTokens = (mode) =>({
    typography: {
      fontFamily: 'Montserrat',
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
        background: {
        ...(mode === "dark"? {
          default: '#171717',
          paper: '#171717',
          container: '#171717eb',
          hover: '#837a7a40'
        }: {
          default: '#1f576e',
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
              primary: "#d7d4d4",
              secondary: '#d7d4d4'
            })
      },
    
    },
    shape: {
        borderRadius: 1
      }
  })
