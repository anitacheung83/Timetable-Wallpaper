import React, { ReactNode } from "react";
import Collapsible from "../components/Collapsible";
import AddACourse from "../components/AddACourse";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CourseList from "../components/CourseList";
import CourseGridRender from "../components/CourseGridRender";
import Timetable from "../components/Timetable";
import TimetableBackground from "../components/TimetableBackground";
import Grid from "@mui/material/Grid";
import SettingsIcon from '@mui/icons-material/Settings';
import Setting from "../components/Setting";



export default function Home() {
    return (
        <>

            {/* <CourseGridRender /> */}


            <Grid container>
                <Grid item xs={8}
                    alignItems="center"
                    justifyContent="center"
                    display="flex">
                    <TimetableBackground />


                </Grid>
                <Grid item xs={4}>
                    <Collapsible title={"Setting"} component={<Setting />} icon={<SettingsIcon />} backgroundColor="transparent" />
                    <Collapsible title={"Add A Course"} component={<AddACourse />} icon={<AddCircleIcon />} backgroundColor="transparent" />
                    <CourseList />

                </Grid>
            </Grid>
        </>
    )
}