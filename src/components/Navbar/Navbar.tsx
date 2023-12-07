import React from "react";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import SchoolIsFactoryBlackLogo from "../../assets/SchoolIsFactoryBlackLogo.png";
import SchoolIsFactoryBrownLogo from "../../assets/SchoolIsFactoryBrownLogo.png";
import DarkModeToggle from "./DarkModeToggle/DarkModeToggle";
import { useDarkModeContext } from "../../context/DarkModeContext";
import { Toolbar } from "@mui/material";

/**
 * The `Navbar` component displays a navigation bar with branding, a title, and dark mode toggle functionality.
 *
 * @component
 */
export default function Navbar() {
    // Access the darkMode state and setDarkMode function from the DarkModeContext
    const { darkMode } = useDarkModeContext();

    return (
        <>
            {/* The top navigation bar */}
            <AppBar
                position="static"
                color="secondary"
                sx={{
                    boxShadow: "0px 0px 0px",
                    borderStyle: "none none solid none",
                    borderColor: `${darkMode ? "#232323" : "#C2B8A3"}`,
                    borderWidth: "1px"
                }}
            >
                <Toolbar>
                    {/* Display the School Is Factory logo based on dark mode */}
                    {darkMode ? (
                        <img src={SchoolIsFactoryBrownLogo} alt="School Is Factory Brown Logo" width="44px" style={{ marginRight: "0.5em" }} />
                    ) : (
                        <img src={SchoolIsFactoryBlackLogo} alt="School Is Factory Black Logo" width="44px" style={{ marginRight: "0.5em" }} />
                    )}
                    {/* Branding and title */}
                    <div className="center">
                        <Typography variant="h4" sx={{ lineHeight: 1 }}>Timetable Factory</Typography>
                        <Typography variant="caption" sx={{ lineHeight: 1 }}>By SCHOOL IS FACTORY</Typography>
                    </div>
                    {/* Dark mode toggle button */}
                    <div style={{ marginLeft: "auto" }}>
                        <DarkModeToggle />
                    </div>
                </Toolbar>
            </AppBar>
        </>
    )
}
