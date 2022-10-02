import * as React from 'react';
import Image from 'next/image';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
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

        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/sets"
          sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >SETS</Typography>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
