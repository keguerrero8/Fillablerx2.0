import React, { useState } from 'react'

import { NavLink } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu';
import { 
  AppBar, 
  Box, 
  Toolbar, 
  Typography, 
  Menu, 
  Container, 
  IconButton, 
  Avatar, 
  Tooltip, 
  MenuItem, 
  Divider 
} from "@mui/material";
import Cookies from "js-cookie"

export default function Navbar({ setUser, user }) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function handleLogOut () {
    fetch("/auth-sessions/logout", {
      credentials: "include",
      method: "POST",
      headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "X-CSRFToken": Cookies.get("csrftoken")
      },
    })
    .then(r => {
      if (r.ok) {
        setUser(null)
      }
    })
  }
  return (
    <AppBar color="secondary" sx={{backgroundColor: "transparent", position: "absolute"}}>
    <Container maxWidth="xl" sx={{marginTop: "10px"}}>
      <Toolbar disableGutters>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ fontSize: "1.7rem", mr: 2, display: { xs: 'none', md: 'flex' } }}
        >
          <NavLink style={{color: "black", textDecoration: "none"}} to="/">
            FillableRx
          </NavLink>
        </Typography>
       <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="primary"
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
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">
                  <NavLink style={{color: "#1225cc", textDecoration: "none"}} to="/find-medication">find medication</NavLink>
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">
                  <NavLink style={{color: "#1225cc", textDecoration: "none"}} to="/about">about us</NavLink>
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">
                  <NavLink style={{color: "#1225cc", textDecoration: "none"}} to="/pharmacies-network">pharmacies</NavLink>
                </Typography>
              </MenuItem>
              {user ? 
                  <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">
                        <NavLink style={{color: "#1225cc", textDecoration: "none"}} to="/dashboard">dashboard</NavLink>
                      </Typography>
                  </MenuItem>
              : null }
              {/* {user ? 
                  <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center"><NavLink style={{color: "black", textDecoration: "none"}} to="/monitoring">Monitor</NavLink></Typography>
                  </MenuItem>
              : null } */}
          </Menu>
        </Box>
        <Typography
          variant="h6" 
          noWrap
          component="div"
          sx={{ fontSize: "1.7rem", flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
        >
          <NavLink style={{color: "black", textDecoration: "none"}} to="/">
          FillableRx
          </NavLink>
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: "left", alignItems: "center", gap: "1rem" }}>
          <Divider color="black" orientation="vertical" flexItem />
          <Typography onClick={handleCloseNavMenu} >
            <NavLink style={{color: "#1225cc", textDecoration: "none"}} to="/about">about us</NavLink>
          </Typography>
          <Divider color="black" orientation="vertical" flexItem />
          <Typography onClick={handleCloseNavMenu} >
            <NavLink style={{color: "#1225cc", textDecoration: "none"}} to="/find-medication">find medication</NavLink>
          </Typography>
          <Divider color="black" orientation="vertical" flexItem />
          <Typography onClick={handleCloseNavMenu} >
            <NavLink style={{color: "#1225cc", textDecoration: "none"}} to="/pharmacies-network">pharmacies</NavLink>
          </Typography>
          <Divider color="black" orientation="vertical" flexItem />
           {user ? 
           <>
            <Typography onClick={handleCloseNavMenu} >
              <NavLink style={{color: "#1225cc", textDecoration: "none"}} to="/dashboard">dashboard</NavLink>
            </Typography>
           {/* <Typography onClick={handleCloseNavMenu} ><NavLink style={{color: "#1225cc", textDecoration: "none"}} to="/monitoring">monitoring</NavLink></Typography> */}
           </>
           : null}
        </Box>

        <Box sx={{ flexGrow: 0 }}>
           {user ? 
           <>
              <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt="Remy Sharp" src={user.avatar} sx={{bgcolor: "#1225cc"}}/>
                  </IconButton>
              </Tooltip>
              <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">
                      <NavLink style={{color: "#1225cc", textDecoration: "none"}} to="/" onClick={handleLogOut}>Log out</NavLink>
                    </Typography>
                  </MenuItem>
              </Menu>             
           </> : 
           <Typography onClick={handleCloseNavMenu} >
            <NavLink style={{color: "black", textDecoration: "none"}} to="/login">admin login</NavLink>
          </Typography>}
        </Box>
      </Toolbar>
    </Container>
  </AppBar>
  )
}
