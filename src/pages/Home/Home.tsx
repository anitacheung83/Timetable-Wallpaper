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
import Ipad from "./Ipad/Ipad"
import Typography from "@mui/material/Typography";


export default function Home() {

    return (
        <>
            <div style={{ minHeight: "100vh" }}>

                <Navbar />

                <Grid container direction="row" sx={{ minHeight: "780px" }}>

                    <Grid item xs={12} md={9}
                        justifyContent="center"
                        display="flex"
                    // sx={{ backgroundColor: "white" }}
                    >
                        {/* <h1 className={"modelName"}>Iphone </h1> */}

                        {/* <Typography variant="h1" sx={{ writingMode: "vertical-lr", textOrientation: "mixed", transform: "rotate(-180deg)", transformOrigin: "56% 20%", opacity: "49%" }}>Iphone</Typography> */}
                        <div style={{ borderRadius: "18px", backgroundColor: "#f2f2f2", boxShadow: "2px 4px 12px rgba(0, 0, 0, .08", padding: "20px 60px", margin: "20px", }}>

                            {/* <Ipad /> */}
                            <Iphone />
                        </div>

                    </Grid>

                    <Grid item xs={12} md={3} sx={{ borderRadius: "10px 0px 0px 10px", borderStyle: "none none none solid", borderColor: "#C2B8A3", borderWidth: "1px" }}>
                        {/* I want to make this grid scrollable */}
                        <div style={{ maxHeight: '780px', overflow: 'auto', scrollbarGutter: "stable", scrollbarColor: "red" }}>

                            <Collapsible title={"Add A Course"} component={<AddACourse />} icon={<AddCircleIcon sx={{ position: "absolute", right: "4%" }} />} backgroundColor="transparent" isCourse={false} />
                            <CourseList />
                            <Collapsible title={"Setting"} component={<Setting />} icon={<SettingsIcon sx={{ position: "absolute", right: "4%" }} />} backgroundColor="#C2B8A3" isCourse={false} />
                            <Download backgroundColor="#C2B8A3" />
                        </div>


                    </Grid>
                </Grid>

                <Footer />
            </div>
        </>
    )
}

// backgroundColor: "rgb(194, 184, 163, 0.0)", boxShadow: "-1px 1px 10px #999999",