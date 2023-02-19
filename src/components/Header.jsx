import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useContext, useState } from "react";

import { AuthContext } from "../context/AuthContext.jsx";
import RestService from "../services/RestService.js";
import { useNavigate } from "react-router-dom";

const Header = () => {
  let navigate = useNavigate();
  const signed = sessionStorage.getItem("signed");
  const loginData = JSON.parse(sessionStorage.getItem("loginData"));

  console.log(loginData);
  const { setSigned } = useContext(AuthContext);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const goHomeHandle = () => {
    navigate("/home");
    handleCloseUserMenu();
  };
  const profileEditHandle = () => {
    handleCloseUserMenu();
  };
  const getUsersHandle = () => {
    handleCloseUserMenu();
  };

  const logoutHandle = async () => {
    await RestService.GET(`/auth/logout`, loginData.access_token).then(
      (res) => {
        console.log(res);
        setSigned(false);
        navigate("/");
        setTimeout(sessionStorage.clear(), 2000);
      }
    );
  };

  if (!signed) {
    logoutHandle();
  }

  const settings = [
    ["Home", goHomeHandle],
    ["Perfil", profileEditHandle],
    ["Usuários", getUsersHandle],
    ["Sair", logoutHandle],
  ];

  return (
    loginData && (
      <AppBar position="static" sx={{ mb: 10 }}>
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Typography variant="h4" noWrap component="div" sx={{ mr: 2 }}>
              Plannit
            </Typography>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Menu">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={loginData.user.name}
                    src={loginData.user.Photo}
                  />
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
                  <MenuItem key={setting[0]} onClick={setting[1]}>
                    <Typography textAlign="center">{setting[0]}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    )
  );
};
export default Header;
