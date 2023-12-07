import React from "react";
import { useDarkModeContext } from "../../../../context/DarkModeContext";
import IconButton from "@mui/material/IconButton";
import ColorizeIcon from '@mui/icons-material/Colorize';


interface ColorPickerProps {
    // name e.g. "background-color"
    name: string
    // value e.g. "#000000"
    value: string
    // function to handle the change event
    handleChange: (value: string) => void
}

export default function ColorPicker(props: ColorPickerProps) {
    const { darkMode } = useDarkModeContext();

    const shadowColor = darkMode ? "#DAD6CE66" : "#00000066"
    const iconColor = darkMode ? "#DAD6CE44" : "#00000044"

    function handleChecked(value: string) {
        props.handleChange(value)
    }

    return (
        <IconButton sx={{ cursor: "pointer", border: `3px solid ${props.value}`, borderRadius: "6px", height: "24px", width: "24px", position: "relative", margin: "8px", boxShadow: `${shadowColor} 0 0 .6vw 0`, backgroundColor: `${props.value}66` }}>
            <input type="color"
                value={props.value}
                onChange={(event) => handleChecked(event.target.value)}
                id={props.name}
                style={{ opacity: 0, height: 0, width: 0, position: "absolute", padding: "0px", border: "none" }} />

            <label htmlFor={props.name} style={{ cursor: "pointer", height: "22px", width: "22px" }}>
                {/* <AddIcon sx={{ color: props.value }} /> */}
                <ColorizeIcon sx={{ color: iconColor, height: "22px", width: "22px" }} />
            </label>
        </IconButton>
    )
}