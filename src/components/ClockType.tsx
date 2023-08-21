import { Button } from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";
import React from "react";

export default function ClockType() {
    return (
        <>
            <h3>Clock Type:</h3>
            <ButtonGroup>
                <Button>12 Hour</Button>
                <Button>24 Hour</Button>
            </ButtonGroup>
        </>
    )
}