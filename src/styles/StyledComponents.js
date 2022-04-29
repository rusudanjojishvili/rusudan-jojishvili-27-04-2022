import { styled } from '@mui/material/styles'
import { AppBar, TextField, Box, Grid } from '@mui/material'

export const CustomizedAppBar = styled(AppBar)({
  '&.MuiAppBar-root': {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    backgroundImage: 'none'
  },
});

export const CustomizedGrid = styled(Box)({
  overflow: 'auto',
  height: '100%',
  '&::-webkit-scrollbar': {
    width: '8px',
    height: '3px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: '#CBD6D9',
    boxShadow: 'inset 0 0 5px grey',
    borderRadius: '10px',   
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    height: '10px'
  },
});

export const CustomizedBox = styled(Box)({
    backgroundColor: '#42728a', 
    zIndex: 1000, width: '100%', 
    height: 200, 
    position:'absolute',
    padding: '5px 4px',
    borderRadius: '10px',
    boxShadow: ' 0.5px 0.5px 3px 0px rgba(33,33,33,1)'
});

export const CustomizedTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: 20,
    '& fieldset': {
      borderColor: '#d7d4d4',//#b3b3b3
    },
    '&:hover fieldset': {
      borderColor: '#1f576e',
    },
    '&.Mui-focused fieldset': {
      border: '2px solid #c6f5ff',
      // borderRadius: '20px 20px 0px 0px'
    },
  },
});