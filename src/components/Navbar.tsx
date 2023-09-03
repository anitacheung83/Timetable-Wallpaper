import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import SchoolIsFactoryLogo from "../assets/SchoolIsFactoryBlackLogo.png"
import React from "react";
import { Toolbar } from "@mui/material";

export default function Navbar() {
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <img src={SchoolIsFactoryLogo} alt="School Is Factory Black Logo" width="49px" style={{ marginRight: "1%" }} />
                    <div className="center">
                        <Typography variant="h4" sx={{ lineHeight: 1 }}>Timetable Factory</Typography>
                        <Typography variant="caption" sx={{ lineHeight: 1 }}>By SCHOOL IS FACTORY</Typography>

                    </div>
                </Toolbar>

            </AppBar>
        </>
    )
}