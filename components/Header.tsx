import * as React from 'react';
import Image from 'next/image';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';

const ResponsiveAppBar = ({ children }: any) => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >

          <a href="/" style={{height: '55px'}}>
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
export default ResponsiveAppBar;
