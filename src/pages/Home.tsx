import React, { useState, useEffect } from "react";
import { useDarkModeContext } from "../context/DarkModeContext";
import Grid from "@mui/material/Grid";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Menu from "../components/Menu/Menu";
import ColorRadioSelection from "../components/Menu/Inputs/ColorSelector/ColorSelector";
import Carousel from "../components/MainContent/Carousel/Carousel";


export default function Home() {
    const { darkMode } = useDarkModeContext()
    const [deviceDivColor, setDeviceDivColor] = useState("transparent")

    useEffect(() => {
        setDeviceDivColor("transparent")
    }, [darkMode])


    return (
        <>
            <div style={{ minHeight: "100vh" }}>

                <Navbar />

                <Grid container direction="row" sx={{ minHeight: "780px" }}>
                    <Grid item xs={12} sm={12} md={12} lg={8.5}
                        justifyContent="center"
                        display="flex"
                        alignItems="center"
                        sx={{ backgroundColor: deviceDivColor }}
                    >

                        <Carousel />

                        {/* <ColorRadioSelection name="deviceDivColor" handleChange={setDeviceDivColor} value={deviceDivColor} options={["#FFFFFF", "#DAD6CE", "#121212", "#000000"]} direction="column" /> */}
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={3.5}
                        sx={{ borderRadius: "10px 0px 0px 10px", borderStyle: "none none none solid", borderColor: `${darkMode ? "#232323" : "#C2B8A3"}`, borderWidth: "1px" }}>
                        {/* I want to make this grid scrollable */}
                        <Menu />
                    </Grid>
                </Grid>

                <Footer />
            </div>
        </>
    )
}