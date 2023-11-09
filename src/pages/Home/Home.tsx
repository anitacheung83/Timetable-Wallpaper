import React from "react";
import { useDarkModeContext } from "../../context/DarkModeContext";
import Grid from "@mui/material/Grid";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer/Footer";
import MenuItems from "../../components/Menu/MenuItems/MenuItems";
import Device from "../../components/Device/Device";

export default function Home() {
    const { darkMode, setDarkMode } = useDarkModeContext()

    return (
        <>
            <div style={{ minHeight: "100vh" }}>

                <Navbar />

                <Grid container direction="row" sx={{ minHeight: "780px" }}>


                    <Grid item xs={12} md={8.5}
                        justifyContent="center"
                        display="flex"
                        alignItems="center"
                    >
                        <Device />
                    </Grid>

                    <Grid item xs={12} md={3.5} sx={{ borderRadius: "10px 0px 0px 10px", borderStyle: "none none none solid", borderColor: `${darkMode ? "#232323" : "#C2B8A3"}`, borderWidth: "1px" }}>
                        {/* I want to make this grid scrollable */}
                        <MenuItems />
                    </Grid>
                </Grid>

                <Footer />
            </div>
        </>
    )
}

// backgroundColor: "rgb(194, 184, 163, 0.0)", boxShadow: "-1px 1px 10px #999999",