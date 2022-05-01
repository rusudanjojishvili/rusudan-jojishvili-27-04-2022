
export const BASE_URL = 'https://dataservice.accuweather.com/'

export const END_POINT = {
    CURRENT_CONDITIONS:'currentconditions',
    FORECASTS: 'forecasts',
    LOCATIONS: 'locations'
}

export const apikey = 'fnvq9tverN2qw9m7mmBpaGWlZRvS5BFJ'

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

