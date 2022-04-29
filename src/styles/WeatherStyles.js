import { styled } from '@mui/material/styles'
import { TextField } from '@mui/material'

export const CustomizedTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: 20,
    '& fieldset': {
      borderColor: '#d7d4d4',//#b3b3b3
    },
    '&:hover fieldset': {
      borderColor: '1f576e',
    },
    '&.Mui-focused fieldset': {
      border: '2px solid #c6f5ff',
    },
  },
});