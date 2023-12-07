import React, { useEffect, useState } from 'react';
import Home from './pages/Home';
import { ThemeProvider, PaletteColorOptions, createTheme } from '@mui/material/styles';
import "./App.css"
import { settingsActions } from './store/settings-slice';
// import { useDispatch } from 'react-redux';
import { coursesActions } from './store/courses-slice';
import { getTimetable } from './store/timetable-action';
import { getPages } from './store/pages-action';
import { useDispatch, useTypedSelector } from './store';
import { getTheme } from "./theme"
import { DarkModeContext } from './context/DarkModeContext';
import LandingPage from './pages/LandingPage';
import ImgPopUp from './components/Menu/MenuItems/DownloadImage/ImgPopUp/ImgPopUp';
import { stylingActions } from './store/styling-slice';

function App() {
  const dispatch = useDispatch()
  const [darkMode, setDarkMode] = useState(false)
  const theme = getTheme(darkMode)
  const [homePage, setHomePage] = useState(false)

  useEffect(() => {
    dispatch(stylingActions.fetchStyling())
    dispatch(settingsActions.fetchSettings("iphone"))
    dispatch(coursesActions.fetchCourses())
    dispatch(getPages())
    dispatch(getTimetable())

  }, [dispatch])

  function handleCreateNow() {
    setHomePage(true)
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>

          {
            homePage ?
              <Home /> :
              <LandingPage handleCreateNow={handleCreateNow} />
          }
          {/* <ImgPopUp /> */}

        </DarkModeContext.Provider>
      </ThemeProvider>
      {/* {emptyTimetableHour.insertion!({ rowspan: 2, component: null })} */}
    </>
  );
}

export default App;
