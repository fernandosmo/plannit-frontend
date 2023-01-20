import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useContext, useState } from 'react';

import { AuthContext } from '../context/AuthContext.jsx';
import RestService from '../services/RestService.js';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  let navigate = useNavigate();
  const { loginData, setSigned } = useContext(AuthContext);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const goHomeHandle = () => {
    navigate('/home');
  };
  const profileEditHandle = () => {};
  const getUsersHandle = () => {};

  const logoutHandle = async () => {
    const getObras = await RestService.GET(
      `/auth/logout`,
      loginData.access_token
    );
    setSigned(false);
    localStorage.clear();
    getObras && navigate('/');
  };

  const settings = [
    ['Home', goHomeHandle],
    ['Perfil', profileEditHandle],
    ['Usuários', getUsersHandle],
    ['Sair', logoutHandle],
  ];
  return loginData ? (
    <AppBar position="static" sx={{ mb: 10 }}>
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h4" noWrap component="div" sx={{ mr: 2 }}>
            Plannit
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Menu">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={loginData.user.name} src={loginData.user.Photo} />
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
              onClose={handleCloseUserMenu}>
              {settings.map((setting) => (
                <MenuItem key={setting[0]} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" onClick={setting[1]}>
                    {setting[0]}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  ) : (
    navigate('/')
  );
};
export default Header;
