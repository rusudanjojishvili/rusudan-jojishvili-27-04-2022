export const innerContainer = { 
    backgroundColor: 'background.container',
    boxShadow: 'inset 0 0 5px #577e972b',
    border: '1px solid #577e972b',
    borderRadius: '5px',
    textAlign: 'center',
    // -webkit-backdrop-filter: blur(10px);
    backdropFilter: 'blur(10px)',
    p:{ xs: '0px', sm: '20px', md:'30px' },
    borderRadius: 20,
    }

export const forecastItem = {
    border: '1px solid #d7d4d4', 
    p: {xs: '5px 2px' , sm: '25px 5px'}, 
    width: {xs: '65px' , sm: '100px', lg: '200px'},
    height: {xs: '150px' , sm: '150px', lg: '200px'},
    borderRadius: {xs: '15px' , sm: '24px'}
}

export const snackbarRoot = {
    position: 'absolute',
    top: '69px',
    right: '30px',
    width: 'auto',
    zIndex: 1400,
    opacity: 0.8
    // '& > * + *': {
    //     marginTop: theme.spacing(3),
    // },
    // [theme.breakpoints.down('xs')]: {
    //     position: 'absolute',
    //     zIndex: 1400,
    //     width: '90%',
    //     right: '5%',
    // },
}

export const favoriteItemStyle = {
    border: '1px solid #d7d4d4', 
    p: '25px 5px', 
    width: '200px',
    height: '200px',
    borderRadius:  '24px'
}

