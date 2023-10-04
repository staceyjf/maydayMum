import { Link } from "react-router-dom";
import * as userService from "../../utilities/users-service";
import {
  MenuItem,
  Typography
} from '@mui/material';

function SettingMenu({ user, setUser, setAnchorElUser }) {
  let settings;

  if (user) {
    settings = ["ACCOUNT PROFILE", "LOGOUT"]; // Logged in
  } else {
    settings = ["LOG IN", "SIGN UP"]; // Not logged in
  }
  
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  
  function handleLogOut() {
    userService.logOut();
  }
  
  function determineURLs(setting) {
    let linkUrl;
    if (setting === "LOGOUT") {
      linkUrl = "/users/log-in";
    } else {
      linkUrl = setting === "ACCOUNT PROFILE" ? "accounts" : "users";
      linkUrl += `/${setting.toLowerCase().replace(/\s+/g, "-")}`;
    }
    return linkUrl;
  }

  return (
    <>
      {/* dynamically updating the link to the right route */}
      {settings.map((setting) => {
        const linkUrl = determineURLs(setting);
        return (
          <MenuItem key={setting} onClick={handleCloseUserMenu}>
            <Typography textAlign="center">
              {setting === "LOGOUT" ? (
                <a
                  href={linkUrl}
                  style={{ textDecoration: "none", color: "black" }}
                  onClick={handleLogOut}
                >
                  {setting}
                </a>
              ) : (
                <Link to={linkUrl} style={{ textDecoration: "none", color: "black" }}>
                  {setting}
                </Link>
              )}
            </Typography>
          </MenuItem>
        );
      })}
    </>
  );
}

export default SettingMenu;
