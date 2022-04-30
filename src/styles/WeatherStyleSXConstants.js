export const innerContainer = { 
    backgroundColor: 'background.container',
    boxShadow: 'inset 0 0 5px #577e972b',
    border: '1px solid #577e972b',
    borderRadius: '5px',
    textAlign: 'center',
    // -webkit-backdrop-filter: blur(10px);
    backdropFilter: 'blur(10px)',
    p: '30px',
    borderRadius: 20,
    }

export const forecastItem = {
    border: '1px solid #d7d4d4', 
    p: '25px 5px', 
    width: 200,
    height: 200,
    borderRadius: 24
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
