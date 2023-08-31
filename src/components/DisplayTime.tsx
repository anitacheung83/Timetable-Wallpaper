import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import Typography from "@mui/material/Typography"
import React, { useState } from "react"


interface DisplayTimeProps {
    value: boolean
    handleChange: React.Dispatch<React.SetStateAction<boolean>>
}

export default function DisplayTime(props: DisplayTimeProps) {
    const [displayTime, setDisplayTime] = useState<boolean>(props.value)

    function handleDisplayTimeChange(event: React.MouseEvent<HTMLElement>, newDisplayTime: boolean) {
        setDisplayTime(newDisplayTime)
        props.handleChange(newDisplayTime)
    }
    return (
        <>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>

                <Typography variant="body1">Display time:</Typography>

                <ToggleButtonGroup aria-label="hour formatting" color="info" value={displayTime}>
                    <ToggleButton value={true} aria-label="yes" onClick={handleDisplayTimeChange}>Yes</ToggleButton>
                    <ToggleButton value={false} aria-label="yes" onClick={handleDisplayTimeChange}>No</ToggleButton>

                </ToggleButtonGroup>
            </div>
        </>
    )
}