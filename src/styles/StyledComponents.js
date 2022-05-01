import { styled } from '@mui/material/styles'
import { AppBar, TextField, Box, ListItem, Button, Alert, Grid, ToggleButton } from '@mui/material'

export const CustomizedAppBar = styled(AppBar)({
  '&.MuiAppBar-root': {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    backgroundImage: 'none',
  },
});
export const Container = styled(Grid)(({ theme, color }) => ({
  [theme.breakpoints.between('xs', 'md')]: {
    width: '100%'
  },
  [theme.breakpoints.only('lg')]: {
    width: '95%'
  },
  [theme.breakpoints.up('xl')]: {
    width: '1145px'
  },
}));
export const CustomizedButton = styled(Button)(({ theme, color }) => ({
  '&.MuiButton-root': {
    textTransform: 'capitalize',
    color: theme.palette.text.primary,
    borderRadius: 20,
    padding: 0
  },
}));

export const CustomizedSnackBarBox = styled(Box)(({ theme, color }) => ({
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
}));
export const CustomizedAlert = styled(Alert)(({ theme, color }) => ({
  '&.MuiPaper-root':{
    borderRadius: '10px'
  }
}));

export const CustomizedGrid = styled(Box)({
  overflow: 'auto',
  height: '100%',
  '&::-webkit-scrollbar': {
    width: '8px',
    height: '3px',
  },
  '&::-webkit-scrollbar-track': {
    boxShadow: 'inset 0 0 5px grey',
    borderRadius: '10px',   
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    height: '10px'
  },
});

export const CustomizedBox = styled(Box)(({ theme, color }) => ({
  backgroundColor: theme.palette.background.paper,
  zIndex: 1000, width: '100%', 
  height: 200, 
  position:'absolute',
  padding: '5px 4px 5px 0px',
  borderRadius: '10px',
  boxShadow: ' 0.5px 0.5px 4px 0px rgba(33,33,33,1)'
}));


export const CustomizedTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: 20,
    '& fieldset': {
      borderColor: '#d7d4d4',//#b3b3b3
    },
    '&:hover fieldset': {
      borderColor: '#c6f5ff',
    },
    '&.Mui-focused fieldset': {
      border: '2px solid #c6f5ff',
    },
  },
});
export const CustomizedListItem = styled(ListItem)(({ theme, color }) => ({
  '&.MuiListItem-root': {
     paddingTop: 4,
     paddingBottom: 4,
     fontSize: 18,
     cursor: 'pointer',
     '&:hover': {
       backgroundColor: theme.palette.background.hover
     }
  },
}));
export const CustomizedToggleButton = styled(ToggleButton)(({ theme, color }) => ({
  '&.MuiToggleButton-root': {
    borderRadius:10,
    padding: '4px 8px',
    border: '1px solid #FFFFFF40',
    // color: '0000008a',
    '&.Mui-selected':{
      backgroundColor: '#FFFFFF40',
      color: '#FFFFFF'
    }
  },
}));
