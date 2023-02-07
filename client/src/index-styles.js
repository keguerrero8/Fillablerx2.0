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
        main: '#154161', 
      },
      secondary: {
        main: '#FFFFFF', 
      },
    },
    typography: {
      fontFamily: 'Figtree'
    }
})

