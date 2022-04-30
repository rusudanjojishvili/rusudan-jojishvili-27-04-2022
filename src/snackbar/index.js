import React from 'react'
import { Collapse, IconButton, Typography, Alert } from '@mui/material';
import * as actionSnackBar from "../../redux/snackbarSlice";
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from "react-redux";
import {snackbarRoot} from '../../styles/WeatherStyleSXConstants'
import { CustomizedAlert , CustomizedSnackBarBox } from '../../styles/StyledComponents'

function CustomizedSnackbar() {
  const dispatch = useDispatch();
	const snackBarOBJ = useSelector(state => state.snackbar);

  const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		dispatch(actionSnackBar.disableSnackBar());
	};

  return (
    <CustomizedSnackBarBox>
			<Collapse in={snackBarOBJ.visible} timeout={400}>
				<CustomizedAlert
					elevation={4}
					variant="filled"
					severity={snackBarOBJ.type}
					action={
						<IconButton
							// className={classes.closeSnackbar}
							elevation={4}
							variant="filled"
							severity={snackBarOBJ.type}
							onClick={handleClose}>
							<CloseIcon style={{ color: "#FFFFFF" }} />
						</IconButton>
					}>
					<Typography data-cy="snackbar-msg" style={{ color: "#FFFFFF" }}>{snackBarOBJ.message}</Typography>
				</CustomizedAlert>
			</Collapse>
		</CustomizedSnackBarBox>
  )
}

export default CustomizedSnackbar