import React from 'react';
import Home from './pages/Home';
import { ThemeProvider, PaletteColorOptions, createTheme } from '@mui/material/styles';
import "./App.css"


declare module '@mui/material/styles' {
  interface Palette {
    tertiary: PaletteColorOptions;
  }

  interface PaletteOptions {
    tertiary: PaletteColorOptions;
  }
}

declare module '@mui/material/styles' {
  interface TypographyVariants {
    poster: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    poster?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    poster: true;
  }
}
const { palette } = createTheme();

const theme = createTheme({
  palette: {
    primary: {
      main: "#C2B8A3"
    },
    secondary: {
      main: "#F8F4EC"
    },
    info: {
      main: "#000000"

    },
    tertiary: palette.augmentColor({
      color: {
        main: "#00ff00"
      }
    })


  },
  typography: {
    h1: {
      fontFamily: "'DM Serif Display', serif;",
      color: 'black'
    },
    h3: {
      fontFamily: "'DM Serif Display', serif;",
      color: 'black'
    },
    h4: {
      fontFamily: "'DM Serif Display', serif;",
      color: 'black'
    },
    body1: {
      fontFamily: "'Quicksand', sans-serif"
    },
    subtitle2: {
      fontFamily: "'Quicksand', sans-serif"
    },
    button: {
      fontFamily: "'Quicksand', sans-serif"
    }

  }
})

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>

        <Home />
      </ThemeProvider>
      {/* {emptyTimetableHour.insertion!({ rowspan: 2, component: null })} */}
    </>
  );
}

export default App;
