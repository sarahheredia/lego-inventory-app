import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    background: {
      default: '#e4f0e2',
    },
    primary: {
      main: 'rgb(255, 207, 0)',
    },
    secondary: {
      main: 'rgb(32, 29, 72)',
    },
    error: {
      main: red.A400,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: 'repeat url(https://149359637.v2.pressablecdn.com/wp-content/uploads/2021/05/Lego-Wallpaper-About-Murals.jpg)',
        },
      },
    }
  },
});

export default theme;
