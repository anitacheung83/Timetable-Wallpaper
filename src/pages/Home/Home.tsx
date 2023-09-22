import React from "react";
import Collapsible from "../../components/Collapsible/Collapsible";
import AddACourse from "./AddACourse";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CourseList from "./CourseList";
import Grid from "@mui/material/Grid";
import SettingsIcon from '@mui/icons-material/Settings';
import Setting from "../../components/Setting/Setting";
import Navbar from "../../components/Navbar";
import Iphone from "./Iphone/Iphone";
import Download from "../../components/DownloadButton/Download";
import Footer from "../../components/Footer/Footer";


export default function Home() {

    return (
        <>
            {/* <CourseGridRender /> */}
            <Navbar />

            <Grid container direction="row" minHeight="80vh">

                <Grid item xs={12} md={8}
                    justifyContent="center"
                    display="flex">
                    {/* <TimetableBackground backgroundColor={setting.backgroundColor} /> */}
                    <Iphone />


                </Grid>
                <Grid item xs={12} md={4}>

                    <Collapsible title={"Setting"} component={<Setting />} icon={<SettingsIcon sx={{ position: "absolute", right: "4%" }} />} backgroundColor="#C2B8A3" />
                    <Collapsible title={"Add A Course"} component={<AddACourse />} icon={<AddCircleIcon sx={{ position: "absolute", right: "4%" }} />} backgroundColor="#C2B8A3" />
                    <CourseList />
                    <Download backgroundColor="#C2B8A3" />


                </Grid>
            </Grid>

            <Footer />
        </>
    )
}