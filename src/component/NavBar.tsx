import { AppBar, Box, IconButton, Menu, MenuItem, Stack } from '@mui/material';
import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';

const NavBar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuOpen = Boolean(anchorEl);

  return (
    <div>
      <AppBar position="static">
        <Stack
          direction="row"
          height={75}
          alignItems="center"
          justifyContent="space-between"
          padding={2}
        >
          <Box>
            <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
              Logo Here
            </div>
          </Box>

          <a href="/office-space">Office Space</a>
          <a href="/reserve-resources">Reserve Resources</a>
          <a href="/return-resources">Return Resources</a>

          <IconButton onClick={handleMenuOpen} color="inherit">
            <FaUserCircle size={24} />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem component="a" href="/profile">
              Profile
            </MenuItem>
            <MenuItem component="a" href="/settings">
              Settings
            </MenuItem>
            <MenuItem component="a" href="/logout">
              Logout
            </MenuItem>
          </Menu>
        </Stack>
      </AppBar>
    </div>
  );
};

export default NavBar;
