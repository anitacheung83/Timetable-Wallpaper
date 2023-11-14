import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import SchoolIsFactoryBlackLogo from "../assets/SchoolIsFactoryBlackLogo.png";
import LandingPageIphone from "../assets/LandingPageIphone.png"
import LandingPageIpad from "../assets/LandingPageIpad.png"
import Navbar from "../components/Navbar";
import Footer from "../components/Footer/Footer";

interface LandingPageProps {
    handleCreateNow: () => void
}

export default function LandingPage(props: LandingPageProps) {
    function handleCreateNow() {
        props.handleCreateNow()
    }
    return (
        <>
            <div>
                <Navbar />
                <Grid container direction="row" sx={{ minHeight: "90vh", overflow: "hidden" }}>
                    <Grid item xs={12} md={6} direction="column" className="center">
                        <div style={{ padding: "0vw 4vw 10vw 8vw" }}>
                            <Typography variant="h3" sx={{ py: "10vh" }}> Design Timetables That Perfectly Fit Your Iphone and Ipad Lockscreen</Typography>
                            <Button variant="outlined" color="info" onClick={handleCreateNow}> Create Now</Button>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6} style={{ display: "flex", alignItems: "center" }}>
                        <div style={{ position: "relative" }}>
                            <img src={LandingPageIphone} alt="Landing Page Iphone" height="600px" style={{ position: "absolute", left: "-320px", top: "190px" }} />
                            <img src={LandingPageIpad} alt="Landing Page Ipad" height="820px" />
                        </div>
                    </Grid>
                </Grid>
                <Footer />

            </div>
        </>
    )
}
// {/* <div style={{ display: "flex", flexDirection: "row" }}>

//     <img src={SchoolIsFactoryBlackLogo} alt="School Is Factory Black Logo" width="60px" height="60px" style={{ marginRight: "2%" }} />
//     <div className="center">
//         <Typography variant="h3" sx={{ lineHeight: 1 }}>Timetable Factory</Typography>
//         <Typography variant="caption" sx={{ lineHeight: 1 }}>By SCHOOL IS FACTORY</Typography>
//     </div>
// </div> */}