import React, { useEffect, useState } from 'react';
import Home from './pages/Home/Home';
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

function App() {
  const dispatch = useDispatch()
  const [darkMode, setDarkMode] = useState(false)
  const theme = getTheme(darkMode)
  useEffect(() => {
    dispatch(settingsActions.fetchSettings("iphone"))
    dispatch(coursesActions.fetchCourses())
    dispatch(getPages())
    dispatch(getTimetable())

  }, [dispatch])

  return (
    <>
      <ThemeProvider theme={theme}>
        <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
          <Home />
        </DarkModeContext.Provider>
      </ThemeProvider>
      {/* {emptyTimetableHour.insertion!({ rowspan: 2, component: null })} */}
    </>
  );
}

export default App;
