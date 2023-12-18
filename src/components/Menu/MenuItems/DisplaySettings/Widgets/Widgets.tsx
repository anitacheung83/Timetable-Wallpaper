import React from "react";
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"

interface WidgetsProps {
    value: boolean,
    handleChange: (value: boolean) => void
}

function Widgets(props: WidgetsProps) {

    function handleWidgetsChange(event: React.MouseEvent<HTMLElement>, newWidgets: boolean) {
        props.handleChange(newWidgets)
    }
    return (
        <div>

            <ToggleButtonGroup aria-label="hour formatting" color="info" value={props.value} size="small">
                <ToggleButton value={true} aria-label="yes" onClick={handleWidgetsChange}>Yes</ToggleButton>
                <ToggleButton value={false} aria-label="no" onClick={handleWidgetsChange}>No</ToggleButton>

            </ToggleButtonGroup>
        </div>
    )
}

export default React.memo(Widgets)