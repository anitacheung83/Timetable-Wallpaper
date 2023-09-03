import React, { ReactNode, useEffect, useState } from "react";
import Collapsible from "../components/Collapsible";
import AddACourse from "../components/AddACourse";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CourseList from "../components/CourseList";
import Timetable from "../components/Timetable";
import TimetableBackground from "../components/TimetableBackground";
import Grid from "@mui/material/Grid";
import SettingsIcon from '@mui/icons-material/Settings';
import Setting from "../components/Setting";
import RenderSetting from "../components/RenderSetting";
import Navbar from "../components/Navbar";
import Iphone from "../components/Iphone";
import Download from "../components/Download";
import { SettingsContextProvider } from "../context/settingsContext";


export default function Home() {

    return (
        <>

            <SettingsContextProvider>


                {/* <CourseGridRender /> */}
                <Navbar />

                <Grid container direction="row">

                    <Grid item xs={12} md={8}
                        justifyContent="center"
                        display="flex">
                        {/* <TimetableBackground backgroundColor={setting.backgroundColor} /> */}
                        <Iphone />


                    </Grid>
                    <Grid item xs={12} md={4}>

                        <Collapsible title={"Setting"} component={<RenderSetting />} icon={<SettingsIcon sx={{ position: "absolute", right: "4%" }} />} backgroundColor="#C2B8A3" />
                        <Collapsible title={"Add A Course"} component={<AddACourse />} icon={<AddCircleIcon sx={{ position: "absolute", right: "4%" }} />} backgroundColor="#C2B8A3" />
                        <CourseList />
                        <Download backgroundColor="#C2B8A3" />


                    </Grid>
                </Grid>
            </SettingsContextProvider>

        </>
    )
}