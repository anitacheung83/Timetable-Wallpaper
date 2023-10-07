import React from "react";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import { settingsActions } from "../../../store/settings-slice";
import { getTimetable } from "../../../store/timetable-action";
import { useDispatch, useTypedSelector } from '../../../store';
import Typography from "@mui/material/Typography";
import PickADeviceCSS from "./pickADevice.module.css"



export default function PickADevice() {
    const dispatch = useDispatch()

    const device = useTypedSelector((state) => state.settings.device)

    function handleIpadClick() {
        dispatch(settingsActions.fetchSettings("ipad"))
        dispatch(getTimetable())
    }

    function handleIphoneClick() {
        dispatch(settingsActions.fetchSettings("iphone"))
        dispatch(getTimetable())
    }

    return (
        <>
            <div className={`centerR ${PickADeviceCSS.div}`}>

                <Typography variant="body1">Device:</Typography>
                <div>
                    <ToggleButtonGroup aria-label="select device" color="info" value={device}>
                        <ToggleButton value="iphone" aria-label="iphone" onClick={handleIphoneClick}>Iphone</ToggleButton>
                        <ToggleButton value="ipad" aria-label="ipad" onClick={handleIpadClick}>Ipad</ToggleButton>
                    </ToggleButtonGroup>
                </div>
            </div>
        </>
    )

}

