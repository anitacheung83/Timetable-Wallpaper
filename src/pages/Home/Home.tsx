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
            <div style={{ minHeight: "100vh" }}>

                <Navbar />

                <Grid container direction="row" sx={{ minHeight: "780px" }}>

                    <Grid item xs={12} md={9}
                        justifyContent="center"
                        display="flex"
                    >
                        <Iphone />
                    </Grid>

                    <Grid item xs={12} md={3} sx={{ backgroundColor: "#E6DDC6", boxShadow: "-2px 1px 20px #999999", borderRadius: "10px 0px 0px 10px" }}>
                        {/* I want to make this grid scrollable */}
                        <div style={{ maxHeight: '780px', overflow: 'auto' }}>

                            <Collapsible title={"Add A Course"} component={<AddACourse />} icon={<AddCircleIcon sx={{ position: "absolute", right: "4%" }} />} backgroundColor="#C2B8A3" isCourse={false} />
                            <CourseList />
                            <Collapsible title={"Setting"} component={<Setting />} icon={<SettingsIcon sx={{ position: "absolute", right: "4%" }} />} backgroundColor="#C2B8A3" isCourse={true} />
                            <Download backgroundColor="#C2B8A3" />
                        </div>


                    </Grid>
                </Grid>

                <Footer />
            </div>
        </>
    )
}