import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import React from "react";
import { Toolbar } from "@mui/material";

export default function Navbar() {
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <div className="center">
                        <Typography variant="h4">Timetable Factory</Typography>
                        <Typography variant="body1">By SCHOOL IS FACTORY</Typography>

                    </div>
                </Toolbar>

            </AppBar>
        </>
    )
}