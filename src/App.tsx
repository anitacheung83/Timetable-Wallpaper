import React, { useEffect } from 'react';
import Home from './pages/Home/Home';
import { ThemeProvider, PaletteColorOptions, createTheme } from '@mui/material/styles';
import "./App.css"
import { settingsActions } from './store/settings-slice';
// import { useDispatch } from 'react-redux';
import { coursesActions } from './store/courses-slice';
import { getTimetable } from './store/timetable-action';
import { useDispatch, useTypedSelector } from './store';



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
    }),
    background: {
      default: "#F8F4EC"
    }


  },
  typography: {
    h1: {
      fontFamily: "'DM Serif Display', serif",
      color: 'black'
    },
    h3: {
      fontFamily: "'DM Serif Display', serif",
      color: 'black'
    },
    h4: {
      fontFamily: "'DM Serif Display', serif",
      color: 'black'
    },
    h5: {
      fontFamily: "'DM Serif Display', serif",
      color: 'black'
    },
    h6: {
      fontFamily: "'DM Serif Display', serif",
      color: 'black'
    },
    body1: {
      fontFamily: "'Quicksand', sans-serif"
    },
    body2: {
      fontFamily: "'Quicksand', sans-serif"
    },
    subtitle2: {
      fontFamily: "'Quicksand', sans-serif"
    },
    caption: {
      fontFamily: "'Quicksand', sans-serif"
    },
    button: {
      fontFamily: "'Quicksand', sans-serif"
    }

  }
})

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(settingsActions.fetchSettings())
    dispatch(coursesActions.fetchCourses())
    dispatch(getTimetable())

  }, [dispatch])

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
