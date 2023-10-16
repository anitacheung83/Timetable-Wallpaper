
import React from "react";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import Typography from "@mui/material/Typography";

interface ClockTypeProps {
    value: "12 Hour" | "24 Hour",
    handleChange: (value: "12 Hour" | "24 Hour") => void
}

export default function ClockType(props: ClockTypeProps) {

    function handleClockTypeChange(event: React.MouseEvent<HTMLElement>, newClockType: "12 Hour" | "24 Hour") {
        props.handleChange(newClockType)
    }

    return (
        <>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>

                <Typography variant="body1">Clock Type:</Typography>

                <ToggleButtonGroup aria-label="clock type formatting" color="info" value={props.value}>
                    <ToggleButton value="12 Hour" aria-label="12 Hour" onClick={handleClockTypeChange}>12 Hour</ToggleButton>
                    <ToggleButton value="24 Hour" aria-label="24 Hour" onClick={handleClockTypeChange}>24 Hour</ToggleButton>
                </ToggleButtonGroup>

            </div>
        </>
    )
}

// selected={clockType === "24 Hour"}