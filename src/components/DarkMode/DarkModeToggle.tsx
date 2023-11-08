import React, { useState } from "react";
import { useDarkModeContext } from "../../context/DarkModeContext";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import IconButton from "@mui/material/IconButton";

export default function DarkModeToggle() {
    const { darkMode, setDarkMode } = useDarkModeContext()

    return (
        <>
            {darkMode ?
                <IconButton color="info">
                    <LightModeIcon onClick={() => setDarkMode(!darkMode)} />
                </IconButton> :
                <IconButton color="info">
                    <DarkModeIcon onClick={() => setDarkMode(!darkMode)} />
                </IconButton>
            }
        </>
    )
}