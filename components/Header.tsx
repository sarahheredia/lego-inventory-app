import * as React from 'react';
import Image from 'next/image';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from '@mui/material';

const Header = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          <a href="/">
            <Image
              height="55px"
              width="55px"
              src="/lego-logo.png"
              alt="Lego Logo"
            />
          </a>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
