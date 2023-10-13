import React from "react";
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import Typography from "@mui/material/Typography"

interface WidgetsProps {
    value: boolean,
    handleChange: (value: boolean) => void
}

export default function Widgets(props: WidgetsProps) {

    function handleWidgetsChange(event: React.MouseEvent<HTMLElement>, newWidgets: boolean) {
        props.handleChange(newWidgets)
    }
    return (
        <div className="centerR">

            <Typography variant="body1">Widgets:</Typography>

            <ToggleButtonGroup aria-label="hour formatting" color="info" value={props.value}>
                <ToggleButton value={true} aria-label="yes" onClick={handleWidgetsChange}>Yes</ToggleButton>
                <ToggleButton value={false} aria-label="no" onClick={handleWidgetsChange}>No</ToggleButton>

            </ToggleButtonGroup>
        </div>
    )
}