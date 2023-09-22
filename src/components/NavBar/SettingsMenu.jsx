import { Link } from "react-router-dom";
import * as userService from "../../utilities/users-service";
import {
  MenuItem,
  Typography,
} from '@mui/material';

function SettingMenu({ setUser, setAnchorElUser }) {
  const settings = ["ACCOUNT PROFILE", "LOG IN", "SIGN UP", "LOGOUT"];

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <>
    {/* dynmaically updating the link to the right route */}
      {settings.map((setting) => {
        let linkUrl;

        if (setting === "LOGOUT") {
          linkUrl = "/";
        } else {
          linkUrl = setting === "ACCOUNT PROFILE" ? "accounts" : "users";
          linkUrl += `/${setting.toLowerCase().replace(/\s+/g, "-")}`;
        }

        return (
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
