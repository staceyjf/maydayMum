import * as React from 'react';
import { Link } from "react-router-dom";
import * as userService from "../../utilities/users-service" 
// MUI
import {  AppBar, Avatar, Button, Box, Container, IconButton, Menu, 
  MenuItem, Toolbar, Tooltip, Typography,  } from '@mui/material';
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "./Logo";
import LogoSmall from "./LogoSmall";

const pages = ["FIND A NANNY", "BOOKINGS"];
const settings = ["ACCOUNT PROFILE", "LOGOUT"];

function NavBar({ user, setUser }) {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
  
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

    function handleLogOut() {
        userService.logOut();
        setUser(null);
    }
    return(
<AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/" 
            sx={{
              mr: 2,
              ml: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            MaydayMum
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link style={{ textDecoration: "none", color: "black"}}  to={`/team/${page.toLowerCase().replace(/\s+/g, "-")}`}>
                        {page}
                    </Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <LogoSmall />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/" 
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 600,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            MaydayMum
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, justifyContent: "flex-end" }}>
            {pages.map((page) => (
                <Link
                    key={page}
                    to={`/team/${page.toLowerCase().replace(/\s+/g, "-")}`} 
                    style={{ textDecoration: "none", color: "inherit", display: "block" }}
                    onClick={handleCloseNavMenu}
                  >
                    <Button
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page}
                    </Button>
                </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar sx={{ bgcolor: 'secondary.main'}}>
                  {user.firstName.slice(0,1) + user.surname.slice(0,1)}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">
                        {setting === "LOGOUT" ? (
                            <a
                            href="/"
                            style={{ textDecoration: "none", color: "black" }}
                            onClick={handleLogOut}
                            >
                            {setting}
                            </a>
                        ) : (
                            // <Link
                            // to={`/${setting.toLowerCase().replace(/\s+/g, "-")}`}
                            // style={{ textDecoration: "none", color: "black" }}
                            // >
                            // {setting}
                            // </Link>
                            <Link
                            to={`/accounts`}
                            style={{ textDecoration: "none", color: "black" }}
                            >
                            {setting}
                            </Link>

                        )}
                        </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar
