import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import SchoolIsFactoryLogo from "../assets/SchoolIsFactoryBlackLogo.png"
import React from "react";
import { Toolbar } from "@mui/material";

export default function Navbar() {
    return (
        <>
            <AppBar position="static" color="secondary" sx={{ boxShadow: "0px 0px 0px", borderStyle: "none none solid none", borderColor: "#C2B8A3", borderWidth: "1px" }}>
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