import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import SchoolIsFactoryBlackLogo from "../assets/SchoolIsFactoryBlackLogo.png"
import SchoolIsFactoryBrownLogo from "../assets/SchoolIsFactoryBrownLogo.png"
import DarkModeToggle from "./DarkMode/DarkModeToggle";
import { useDarkModeContext } from "../context/DarkModeContext";
import React from "react";
import { Toolbar } from "@mui/material";

export default function Navbar() {
    const { darkMode, setDarkMode } = useDarkModeContext()
    return (
        <>
            <AppBar position="static" color="secondary" sx={{ boxShadow: "0px 0px 0px", borderStyle: "none none solid none", borderColor: `${darkMode ? "#232323" : "#C2B8A3"}`, borderWidth: "1px" }}>
                <Toolbar>
                    {darkMode ?
                        <img src={SchoolIsFactoryBrownLogo} alt="School Is Factory Brown Logo" width="49px" style={{ marginRight: "1%" }} /> :
                        <img src={SchoolIsFactoryBlackLogo} alt="School Is Factory Black Logo" width="49px" style={{ marginRight: "1%" }} />}
                    <div className="center">
                        <Typography variant="h4" sx={{ lineHeight: 1 }}>Timetable Factory</Typography>
                        <Typography variant="caption" sx={{ lineHeight: 1 }}>By SCHOOL IS FACTORY</Typography>
                    </div>

                    <div style={{ marginLeft: "auto" }}>
                        <DarkModeToggle />
                    </div>
                </Toolbar>
            </AppBar>
        </>
    )
}