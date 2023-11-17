import React, { useState, useEffect } from "react";
import { useDarkModeContext } from "../../context/DarkModeContext";
import Grid from "@mui/material/Grid";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer/Footer";
import MenuItems from "../../components/Menu/MenuItems/MenuItems";
import Device from "../../components/Device/Device";
import ColorRadioSelection from "../../components/Menu/ColorRadioSelection/ColorRadioSelection";
import { pagesActions } from "../../store/pages-slice";
import IconButton from "@mui/material/IconButton";
import { useSelector, useDispatch } from "react-redux";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import Device2 from "../../components/Device/Device2";

export default function Home() {
    const dispatch = useDispatch()
    const { darkMode, setDarkMode } = useDarkModeContext()
    const [deviceDivColor, setDeviceDivColor] = useState("transparent")

    useEffect(() => {
        setDeviceDivColor("transparent")
    }, [darkMode])

    function handlePrevPage() {
        dispatch(pagesActions.prevPage())
    }

    function handleNextPage() {
        dispatch(pagesActions.nextPage())
    }

    return (
        <>
            <div style={{ minHeight: "100vh" }}>

                <Navbar />

                <Grid container direction="row" sx={{ minHeight: "780px" }}>
                    <Grid item xs={12} md={8.5}
                        justifyContent="center"
                        display="flex"
                        alignItems="center"
                        sx={{ backgroundColor: deviceDivColor }}
                    >

                        <IconButton onClick={handlePrevPage} sx={{ height: "40px", width: "40px" }}>
                            <NavigateBeforeIcon />
                        </IconButton>

                        <Device2 />

                        {/* <Device /> */}

                        <IconButton onClick={handleNextPage} sx={{ height: "40px", width: "40px" }}>
                            <NavigateNextIcon />
                        </IconButton>

                        {/* <ColorRadioSelection name="deviceDivColor" handleChange={setDeviceDivColor} value={deviceDivColor} options={["#FFFFFF", "#DAD6CE", "#121212", "#000000"]} direction="column" /> */}
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