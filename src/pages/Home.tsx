import React, { ReactNode, useEffect, useState } from "react";
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
import RenderSetting from "../components/RenderSetting";
import Navbar from "../components/Navbar";
import Iphone from "../components/Iphone";
import { initialSetting } from "../data/setting.model";
import Download from "../components/Download";


export default function Home() {
    const [setting, setSetting] = useState(getSetting())

    function getSetting() {

        let newSetting = initialSetting

        const localSetting = localStorage.getItem("setting")

        if (localSetting != null) {
            newSetting = JSON.parse(localSetting)
        }

        return newSetting
    }

    useEffect(() => {
        const handleSettingChange = () => {
            const newSetting = getSetting()
            setSetting(newSetting)
        };

        window.addEventListener('setting', handleSettingChange)

        return () => {
            window.removeEventListener('setting', handleSettingChange);
        }
    }, [])

    return (
        <>

            {/* <CourseGridRender /> */}
            <Navbar />

            <Grid container>

                <Grid item xs={8}
                    justifyContent="center"
                    display="flex">
                    {/* <TimetableBackground backgroundColor={setting.backgroundColor} /> */}
                    <Iphone backgroundColor={setting.backgroundColor} />




                </Grid>
                <Grid item xs={4}>

                    <Collapsible title={"Setting"} component={<RenderSetting />} icon={<SettingsIcon sx={{ position: "absolute", right: "4%" }} />} backgroundColor="#C2B8A3" />
                    <Collapsible title={"Add A Course"} component={<AddACourse />} icon={<AddCircleIcon sx={{ position: "absolute", right: "4%" }} />} backgroundColor="#C2B8A3" />
                    <CourseList />
                    <Download backgroundColor="#C2B8A3" />


                </Grid>
            </Grid>
        </>
    )
}