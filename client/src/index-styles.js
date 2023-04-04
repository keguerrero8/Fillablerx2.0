import { createTheme } from "@mui/material";   

export const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 480,
        md: 868,
        lg: 1200,
        xl: 1540
      }
    },
    palette: {
      primary: {
        main: '#050533', 
        light: '#009ffb'
      },
      secondary: {
        main: '#f2f2f2', 
      },
    },
    typography: {
      fontFamily: 'Figtree'
    }
})

