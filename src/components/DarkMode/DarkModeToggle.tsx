import React from "react";
import { useDarkModeContext } from "../../context/DarkModeContext";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import IconButton from "@mui/material/IconButton";

/**
 * DarkModeToggle component is a user interface element for toggling between dark and light modes.
 *
 * @component
 */
export default function DarkModeToggle() {
    // Access the darkMode state and setDarkMode function from the DarkModeContext
    const { darkMode, setDarkMode } = useDarkModeContext();

    return (
        <>
            {darkMode ?
                // Render a button for switching to light mode when dark mode is enabled
                <IconButton color="info" data-testid="light-mode">
                    <LightModeIcon onClick={() => setDarkMode(!darkMode)} />
                </IconButton> :
                // Render a button for switching to dark mode when light mode is enabled
                <IconButton color="info" data-testid="dark-mode">
                    <DarkModeIcon onClick={() => setDarkMode(!darkMode)} />
                </IconButton>
            }
        </>
    )
}
