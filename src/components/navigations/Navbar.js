import React from 'react'
import { useTheme } from '@mui/material/styles'
import { Grid, Navbar, Container, AppBar, Typography, Box, Menu, MenuItem, Button, Toolbar,
IconButton} from '@mui/material'
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
      <AppBar position="fixed">
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
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {/* {pages.map((page) => ( */}
                <Button
                //   key={page}
                  component={NavLink}
                  to='/home'
                //   className={(navData) => navData.isActive? classes.activeNavlink : classes.navlink}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Weather forecast
                </Button>
                <Button
                //   key={page}
                  component={NavLink}
                  to='/favorites-current-weather'
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Favorites
                </Button>
                <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                    {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
              {/* ))} */}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    );
  };
export default Topbar