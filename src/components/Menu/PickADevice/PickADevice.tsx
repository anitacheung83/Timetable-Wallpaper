import React from "react";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import { settingsActions } from "../../../store/settings-slice";
import { getTimetable } from "../../../store/timetable-action";
import { useDispatch, useTypedSelector } from '../../../store';
import PickADeviceCSS from "./pickADevice.module.css"
import { getPages } from "../../../store/pages-action";



export default function PickADevice() {
    const dispatch = useDispatch()

    const device = useTypedSelector((state) => state.settings.device)

    function handleIpadClick() {
        dispatch(settingsActions.fetchSettings("ipad"))
        dispatch(getPages())
        dispatch(getTimetable())
    }

    function handleIphoneClick() {
        dispatch(settingsActions.fetchSettings("iphone"))
        dispatch(getPages())
        dispatch(getTimetable())
    }

    function handleLetterClick() {
        dispatch(settingsActions.fetchSettings("letter"))
        dispatch(getPages())
        dispatch(getTimetable())
    }

    function handleA4Click() {
        dispatch(settingsActions.fetchSettings("a4"))
        dispatch(getPages())
        dispatch(getTimetable())
    }

    return (
        <>
            <div className={`centerR ${PickADeviceCSS.div}`}>

                {/* <Typography variant="body1">Device:</Typography> */}
                <div>
                    <ToggleButtonGroup aria-label="select device" color="info" value={device}>
                        <ToggleButton value="iphone" aria-label="iphone" onClick={handleIphoneClick}>Iphone</ToggleButton>
                        <ToggleButton value="ipad" aria-label="ipad" onClick={handleIpadClick}>Ipad</ToggleButton>
                        <ToggleButton value="letter" aria-label="letter" onClick={handleLetterClick}>Letter (paper)</ToggleButton>
                        <ToggleButton value="a4" aria-label="letter" onClick={handleA4Click}>A4 (paper)</ToggleButton>
                    </ToggleButtonGroup>
                </div>
            </div>
        </>
    )

}

