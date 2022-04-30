import React from 'react'
import { useTheme } from '@mui/material/styles'
import { Grid, Navbar, Container, AppBar, Typography, Box, Menu, MenuItem, Button, Toolbar,
IconButton} from '@mui/material'
import { CustomizedAppBar } from '../../styles/StyledComponents'
import MenuIcon from '@mui/icons-material/Menu'
import { NavLink } from 'react-router-dom'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'


const Topbar = ({ColorModeContext}) => {
    const theme = useTheme()
    const colorMode = React.useContext(ColorModeContext)

    const [anchorElNav, setAnchorElNav] = React.useState(null)
    const [anchorElUser, setAnchorElUser] = React.useState(null)
  
    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget)
    };
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget)
    };
  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };
  
    return (
      <CustomizedAppBar position="fixed">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            >
              LOGO
            </Typography>
  
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {/* {pages.map((page) => ( */}
                  <MenuItem 
                //   key={page} 
                  onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Weather forecast</Typography>
                  </MenuItem>
                  <MenuItem 
                //   key={page} 
                  onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Favorites</Typography>
                  </MenuItem>
                {/* ))} */}
              </Menu>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, alignItems: 'center', display: { xs: 'none', md: 'flex' } }}>
              {/* {pages.map((page) => ( */}
                <Button
                //   key={page}
                  // className={(navData) => navData.isActive? 'activeNavlink' : 'navlink'}
                  component={NavLink}
                  to='/home'
                //   className={(navData) => navData.isActive? classes.activeNavlink : classes.navlink}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, ml:1, borderRadius: '10px', color: 'white', display: 'block' }}
                >
                  Home
                </Button>
                <Button
                //   key={page}
                  component={NavLink}
                  to='/favorites'
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, ml: 1, borderRadius: '10px', color: 'white', display: 'block' }}
                >
                  Favorites
                </Button>
                <IconButton 
                sx={{ ml: 2, width: '40px', height: '40px' }} 
                onClick={colorMode.toggleColorMode} color="inherit">
                    {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
              {/* ))} */}
            </Box>
          </Toolbar>
        </Container>
      </CustomizedAppBar>
    );
  };
export default Topbar